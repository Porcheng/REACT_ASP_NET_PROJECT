import './App.css';
import CRUD from './crud';
import Dashboard from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React,{ useState }  from 'react';
import Body from './Body';
import EmployeeSearch from './EmployeeSearch';
import Loading from './Loading';
function App() {
  const [loading, setLoading] = useState(false);

  const handleRouteChange = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulate loading time
  };
  return (
    
    <Router>
      <Dashboard />
      {loading && <Loading loading={loading} />}
      <Routes>
        <Route path="/" element={<Body/>} onEnter={handleRouteChange}  />
        <Route path="/employee-management" element={<CRUD />} onEnter={handleRouteChange}  />
        <Route path="/report" element={<EmployeeSearch/>} onEnter={handleRouteChange} />

      </Routes>
    </Router>
  );
}

export default App;
