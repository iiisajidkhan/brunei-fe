import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './layouts/Layout';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cookies from 'js-cookie';

const ProtectedRoutes = () => {
  const isAuth = Cookies.get('token') ? true : false;
  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

const RedirectIfAuthenticated = ({ children }) => {
  const isAuth = Cookies.get('token') ? true : false;

  return isAuth ? <Navigate to='/' /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
