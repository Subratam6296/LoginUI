import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      setLoading(false);
      return;
    }

    axios.post('https://dummyjson.com/auth/login', {
      username: username,
      password: password,
    })
      .then(response => {
        const { token, id } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        window.location.href = '/profile';
      })
      .catch(error => {
        setError('Invalid username or password. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label className="label">Username:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="input-field" />
          </div>
          <div className="input-group">
            <label className="label">Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" />
          </div>
          <button className="login-btn" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
