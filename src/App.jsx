
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomLayout from './layout/Layout';

import MyDataTable from './components/Table';
import CustomForm from './components/Form';
import EditData from './components/EditEntry';

import OCR from './pages/OCR';

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
            path="/caseForm"
          />
          <Route
            element={
              <CustomLayout>
                <EditData />
              </CustomLayout>
            }
            path="/edit/:id"
          />
          <Route
            element={
              <CustomLayout>
                <OCR />
              </CustomLayout>
            }
            path="/ocr"
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
