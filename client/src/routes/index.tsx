import {  Routes, Route, HashRouter } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import ProfileSelector from '../pages/ProfileSelector';



const AppRoutes: React.FC<any> = () => {
  return (
    <HashRouter >
      <Routes>
        <Route path="/"  element={<ProfileSelector />} />
        <Route path="/dashboard"  element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;