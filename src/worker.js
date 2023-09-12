// In `worker.js`.
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const log = (...args) => postMessage({ type: 'log', payload: args.join(' ') });
const error = (...args) => postMessage({ type: 'error', payload: args.join(' ') });

// Initialize sqlite DB if it doesn't already exist.
const start = function (sqlite3) {
  let db;
  if ('opfs' in sqlite3) {
    db = new sqlite3.oo1.OpfsDb('/tb_cases.sqlite3');
  } else {
    db = new sqlite3.oo1.DB('/tb_cases.sqlite3', 'ct');
  }
  try {
    db.exec(`
    CREATE TABLE IF NOT EXISTS tb_cases(case_id, date, status)`
    );
  } finally {
    db.close();
  }
};

sqlite3InitModule({
  print: log,
  printErr: error,
}).then((sqlite3) => {
  console.log('Create sqlite db if not already exists');
  try {
    start(sqlite3);
  } catch (err) {
    error(err.name, err.message);
  }
});

const insertNewCase = function (sqlite3, event) {
  let db;
  if ('opfs' in sqlite3) {
    db = new sqlite3.oo1.OpfsDb('/tb_cases.sqlite3');
  } else {
    db = new sqlite3.oo1.DB('/tb_cases.sqlite3', 'ct');
  }
  try {
    const res = db.exec({
      sql: 'INSERT INTO tb_cases(case_id, date, status) VALUES (?,?,?)',
      bind: [
        event.data.caseId,
        event.data.date,
        event.data.status,
      ]
    });
    self.postMessage({ type: 'sqliteworkerResponse', payload: res });
  } finally {
    db.close();
  }
}


self.addEventListener('message', async event => {
  sqlite3InitModule({
    print: log,
    printErr: error,
  }).then((sqlite3) => {
    console.log('service worker was pinged with event ', event);
    try {
      if (event.data.type === "insertRow") {
        insertNewCase(sqlite3, event);
      }
    } catch (err) {
      error(err.name, err.message);
    }
  });
  self.postMessage({ type: 'sqliteworkerResponse', payload: 'test123' })
})