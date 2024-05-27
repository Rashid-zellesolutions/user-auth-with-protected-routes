import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Layout = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage and context
    localStorage.removeItem('token');
    setToken(null);
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            {token ? (
              <>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
