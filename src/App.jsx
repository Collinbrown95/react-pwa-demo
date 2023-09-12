import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomLayout from './layout/Layout';

import MyWorker from './worker?worker&inline'

import MyDataTable from './components/Table';
import CustomForm from './components/Form';

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
      <Router>
        <Routes>
          <Route
            element={
              <CustomLayout>
                <MyDataTable />
              </CustomLayout>
            }
            path="/"
          />
          <Route
            element={
              <CustomLayout>
                <CustomForm />
              </CustomLayout>
            }
            path="/page2"
          />
          <Route
            element={
              <CustomLayout>
                <h1>Page 3</h1>
              </CustomLayout>
            }
            path="/page3"
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
