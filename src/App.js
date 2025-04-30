import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './customer/Components/Navbar/Navigation';
import CustomerRoutes from './Routers/CustomerRoutes';
import AdminPannel from './Admin/AdminPannel';
import ScrollToTop from './components/ScrollToTop'; // make sure the path is correct

function App() {
  const isAdmin = true;

  return (
    <div className="">
      <ScrollToTop /> 
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<AdminPannel />} />
      </Routes>
    </div>
  );
}

export default App;
