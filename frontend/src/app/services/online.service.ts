import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  isOnline$ = new BehaviorSubject<boolean>(window.navigator.onLine);
  private readonly queueName = 'requestQueue';
  httpClient = inject(HttpClient);
  swUpdate = inject(SwUpdate);
  constructor() {
    this.listenToOnlineStatus();
    this.isOnline$.subscribe(isOnline => {
      if(isOnline) {
        this.sendQueuedRequests();
        }
    })
  }

  listenToOnlineStatus(): void {
    window.addEventListener('online', () => this.isOnline$.next(true));
    window.addEventListener('offline', () => this.isOnline$.next(false));
  }

  sendRequest(url: string, method: string, data?: any): Observable<any> {
    if (navigator.onLine) {
      return this.httpClient.request(method, url, { body: data });
    } else {
      this.queueRequest(url,method, data);
      return of({});
    }
  }

  queueRequest(url: string, method: string, data?: any): void {
    const queuedRequest = { url, method, data };
    const queuedRequests = this.getQueuedRequests();
    queuedRequests.push(queuedRequest);
    this.saveQueuedRequests(queuedRequests);
  }

  sendQueuedRequests(): void {
    const queuedRequests = this.getQueuedRequests();
    for (const request of queuedRequests) {
      this.sendRequest(request.url, request.method, request.data).subscribe(
        () => {
          this.removeFromQueue(request);
        },
        error => {
          console.error('Error sending request:', error);
        }
      );
    }
  }

  private getQueuedRequests(): any[] {
    const queuedRequestsJson = localStorage.getItem(this.queueName);
    return JSON.parse(queuedRequestsJson || '[]');
  }

  private saveQueuedRequests(queuedRequests: any[]): void {
    localStorage.setItem(this.queueName, JSON.stringify(queuedRequests));
  }

  private removeFromQueue(request: any): void {
    const queuedRequests = this.getQueuedRequests();
    const index = queuedRequests.findIndex(
      queued => queued.url === request.url && queued.method === request.method
    );
    if (index !== -1) {
      queuedRequests.splice(index, 1);
      this.saveQueuedRequests(queuedRequests);
    }
    if (queuedRequests.length === 0) {
      window.location.reload();
    }
  }

}
