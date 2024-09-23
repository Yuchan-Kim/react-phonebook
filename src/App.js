import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './pages/List';
import WriteForm from './pages/WriteForm';
import EditForm from './pages/EditForm';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/list' element={<List />} />
          <Route path='/writeform' element={<WriteForm />} />
          <Route path='/editform/:no' element={<EditForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;