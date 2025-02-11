import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthStyles.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await response.json();

    if (response.status === 200) {
      navigate('/todo');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-box">
        <h2 className="auth-heading">Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            className="auth-input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth-submit-btn" type="submit">Login</button>
        </form>
        {error && <p className="auth-error-message">{error}</p>}
        <p className="auth-switch-text">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
