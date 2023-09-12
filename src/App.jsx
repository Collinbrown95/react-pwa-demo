
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomLayout from './layout/Layout';

import MyWorker from './worker?worker&inline'

import MyDataTable from './components/Table';
import CustomForm from './components/Form';

function App() {
  const worker = new MyWorker();

  return (
    <>
      <Router>
        <Routes>
          <Route
            element={
              <CustomLayout>
                <MyDataTable
                  worker={worker}
                />
              </CustomLayout>
            }
            path="/"
          />
          <Route
            element={
              <CustomLayout>
                <CustomForm
                  worker={worker}
                />
              </CustomLayout>
            }
            path="/page2"
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
