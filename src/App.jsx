import { useState, useEffect } from 'react'
import './App.css'

import MyWorker from './worker?worker&inline'

const worker = new MyWorker();

worker.addEventListener("message", async event => {
  console.log(event.data.type)
  if (event.data.type === "sqliteworkerResponse") {
    console.log('event from sqlite worker: ', event);
  }
})

function App() {
  const [count, setCount] = useState(0)



  const handleButtonClick = function (event) {
    worker.postMessage(event);
  }

  return (
    <>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1)
          handleButtonClick("test")
        }
        }
        >
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
