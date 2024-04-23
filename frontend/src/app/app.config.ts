import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient} from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'tasks',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'isComplete', keypath: 'isComplete', options: { unique: false } },
      { name: 'isOnServer', keypath: 'isOnServer', options: {unique: false}}
    ]
  }]
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig))]
};
