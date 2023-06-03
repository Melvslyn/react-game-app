import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send login credentials to the server
    axios
      .post('http://localhost:8800/api/login', { username, password })
      .then((response) => {
        console.log('Logged in successfully');

        setToken(response.data.token);

        const { role } = response.data;

        if (role === 'Admin') {
          window.location = '/admin';
        } else if (role === 'User') {
          window.location = '/quiz';
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Oops! Something went wrong');
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px', padding: '20px', border: '1px solid black' }}>
        <h2>LOGIN</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <input
          style={{ marginTop: '10px' }}
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {token && <p>Authentication token: {token}</p>}
          <div className="btn-group" style={{ marginTop: '10px' }}>
            <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#239023' }}>
              LOGIN
            </button>
            
          </div>
          {error && <p>{error}</p>}
        </form>
        <p style={{ marginTop: '10px', padding: '5px' }}>Don't have an account? <Link to="/signup">Sign up here</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;
