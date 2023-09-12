// In `worker.js`.
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const log = (...args) => postMessage({ type: 'log', payload: args.join(' ') });
const error = (...args) => postMessage({ type: 'error', payload: args.join(' ') });

// Initialize sqlite DB if it doesn't already exist.
const start = function (sqlite3) {
  let db;
  if ('opfs' in sqlite3) {
    db = new sqlite3.oo1.OpfsDb('/mydb.sqlite3');
  } else {
    db = new sqlite3.oo1.DB('/mydb.sqlite3', 'ct');
  }
  try {
    db.exec('CREATE TABLE IF NOT EXISTS t(a,b)');
  } finally {
    db.close();
  }
};

const sqlEntrypoint = function (sqlite3, query) {
  let db;
  if ('opfs' in sqlite3) {
    db = new sqlite3.oo1.OpfsDb('/mydb.sqlite3');
  } else {
    db = new sqlite3.oo1.DB('/mydb.sqlite3', 'ct');
  }
  try {
    const res = db.exec({
      sql: query,
      returnValue: 'resultRows'
    });
    self.postMessage({ type: 'sqliteworkerResponse', payload: res });
  } finally {
    db.close();
  }
}


self.addEventListener('message', async event => {
  console.log('service worker was pinged');
  sqlite3InitModule({
    print: log,
    printErr: error,
  }).then((sqlite3) => {
    log('Done initializing. Running demo...');
    try {
      sqlEntrypoint(sqlite3, "SELECT * FROM t LIMIT 5");
    } catch (err) {
      error(err.name, err.message);
    }
  });
  self.postMessage({ type: 'sqliteworkerResponse', payload: 'test123' })
})