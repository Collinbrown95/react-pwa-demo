import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import MyWorker from './worker?worker&inline'

import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const start = function (sqlite3) {
  console.log('Running SQLite3 version', sqlite3.version.libVersion);
  const db = new sqlite3.oo1.DB('/mydb.sqlite3', 'ct');
  try {
    console.log('Creating a table...');
    db.exec('CREATE TABLE IF NOT EXISTS t(a,b)');
    console.log('Insert some data using exec()...');
    for (let i = 20; i <= 25; ++i) {
      db.exec({
        sql: 'INSERT INTO t(a,b) VALUES (?,?)',
        bind: [i, i * 2],
      });
    }
    console.log('Query data with exec()...');
    db.exec({
      sql: 'SELECT a FROM t ORDER BY a LIMIT 3',
      callback: (row) => {
        console.log(row);
      },
    });
  } finally {
    db.close();
  }
};

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('Loading and initializing SQLite3 module...');
    sqlite3InitModule({
      print: console.log,
      printErr: console.error,
    }).then((sqlite3) => {
      try {
        console.log('Done initializing. Running demo...');
        start(sqlite3);
      } catch (err) {
        console.error(err.name, err.message);
      }
    });
    // const worker = new Worker('/worker', { type: 'module' });
    const worker = new MyWorker();
    worker.onmessage = (e) => {
      e.data.type === 'log' ? console.log(e.data.payload) : console.log(e.data.payload);
    };
  }, []);  // Ensure useEffect hook runs only once.
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
