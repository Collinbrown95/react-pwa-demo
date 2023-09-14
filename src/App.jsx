
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomLayout from './layout/Layout';

import MyDataTable from './components/Table';
import CustomForm from './components/Form';

function App() {

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
        </Routes>
      </Router>
    </>
  )
}

export default App
