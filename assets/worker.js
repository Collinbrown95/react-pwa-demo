// In `worker.js`.
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

// Initialize sqlite DB if it doesn't already exist.
const start = function (sqlite3) {
  const STARTUP_QUERY = `CREATE TABLE IF NOT EXISTS tb_cases(case_id, date, status)`;
  let db;
  if ('opfs' in sqlite3) {
    db = new sqlite3.oo1.OpfsDb('/tb_cases.sqlite3');
  } else {
    db = new sqlite3.oo1.DB('/tb_cases.sqlite3', 'ct');
  }
  try {
    console.log(`[worker.js]:

Create the tb_cases table in tb_cases.sqlite3 if it doesn't already exist`);
    console.log(`[worker.js - sql]

${STARTUP_QUERY}`);
    db.exec(STARTUP_QUERY);
  } finally {
    console.log(`[worker.js]:
    
Completed tb_cases table initialization.`);

    console.log(`[worker.js]:

Closing connection to tb_cases.sqlite3.`);
    db.close();
  }
};

// Get sqlite3 instance

const sqlite3 = await sqlite3InitModule({
  print: console.log,
  printErr: console.error,
}).then((sqlite3) => {
  try {
    return sqlite3
  } catch (err) {
    console.error(err.name, err.message);
  }
});

// run the initial starting script
start(sqlite3);

const insertNewCase = function (sqlite3, event) {
  const INSERT_QUERY = `INSERT INTO tb_cases(case_id, date, status) VALUES (?,?,?)`
  let db;
  if ('opfs' in sqlite3) {
    db = new sqlite3.oo1.OpfsDb('/tb_cases.sqlite3');
  } else {
    db = new sqlite3.oo1.DB('/tb_cases.sqlite3', 'ct');
  }
  try {
    console.log(`[worker.js]:

Insert the following record into tb_cases table:
    
{
    case_id: ${event.data.caseId},
    date: ${event.data.date.toString()},
    status: ${event.data.status},
}`);

    console.log(`[worker.js - sql]:
    
${INSERT_QUERY}`);
    db.exec({
      sql: INSERT_QUERY,
      bind: [
        event.data.caseId,
        event.data.date.toString(),
        event.data.status,
      ]
    });
    console.log(`[worker.js]:
    
    Inserted record successfully; sending success message to main thread.`);
    self.postMessage({ type: 'sqliteworkerInsertResponse', payload: "success" });
  } finally {
    console.log(`[worker.js]:
    
    Closing connection to tb_cases.sqlite3.`);
    db.close();
  }
}


const readMyCases = function (sqlite3, event) {
  const SELECT_START_QUERY = `SELECT * FROM tb_cases`;
  let db;
  if ('opfs' in sqlite3) {
    db = new sqlite3.oo1.OpfsDb('/tb_cases.sqlite3');
  } else {
    db = new sqlite3.oo1.DB('/tb_cases.sqlite3', 'ct');
  }
  try {
    console.log(`[worker.js]:

Select all columns and all records in the tb_cases table.`);

    console.log(`[worker.js - sql]:
    
${SELECT_START_QUERY}`);
    const res = db.exec({
      sql: SELECT_START_QUERY,
      returnValue: 'resultRows',
    });
    console.log(`[worker.js]:
    
Selected records successfully; sending results message to main thread.`);
    self.postMessage({ type: 'sqliteworkerReadResponse', payload: res });
  } finally {
    console.log(`[worker.js]:
    
Closing connection to tb_cases.sqlite3.`);
    db.close();
  }
}

self.addEventListener('message', async event => {
  console.log(`[worker.js]:
  
Received ${event.data.type} message from main thread.`);
  try {
    if (event.data.type === "insertRow") {
      insertNewCase(sqlite3, event);
    } else if (event.data.type === "readRows") {
      readMyCases(sqlite3, event);
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
});

console.log(`[worker.js]:

Web worker ready; sending workerReady message to main thread.`);
self.postMessage({
  type: "workerReady"
})