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

  const handleButtonClick = function (caseId, date, caseStatus) {
    worker.postMessage(
      {
        type: 'insertRow',
        caseId,
        date,
        status: caseStatus,
      });
  }

  return (
    <>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1)
          handleButtonClick(1, "2020/01/01", "Positive");
        }
        }
        >
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
