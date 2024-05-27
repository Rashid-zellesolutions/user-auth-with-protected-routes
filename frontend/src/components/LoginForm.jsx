import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3008/api/auth/login', {
        username,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Authentication Failed : ', error);
      setToken(null);
      localStorage.removeItem('token');
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('An unexpected error accured please try again');
      }
    }
  };

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}> {errorMessage} </div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder="user name"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
