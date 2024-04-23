const sqlite3 = require('sqlite3').verbose(),
    conf = require("../conf/conf.json"),
    DBSOURCE = 'database/' + conf.dbName + '.sqlite',
    db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
            // Cannot open database
            console.error(err.message);
            throw err;
        } else {
            console.log('Connected to the SQLite database.');
            db.run(
            `CREATE TABLE contacts (
                id text PRIMARY KEY,
                firstName text, 
                lastName text, 
                email text,
                picture text,
                city text,
                cell text,
                phone text,
                age text,
                creationDate DATETIME
            ); `,
                (err) => {
                    if (err) {
                        // Table already created
                        console.log('Users table already created. Use of existing Parameters table.');
                    } else {
                        // Table just created, creating some
                        console.log('Users table created.');
                    }
                }
            );
        }
    });

module.exports = db;