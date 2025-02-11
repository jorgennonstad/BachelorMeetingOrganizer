import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../LoginPage/AuthStyles.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
      navigate('/login'); // Redirect to login after successful registration
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-box">
        <h2 className="auth-heading">Register</h2>
        <form onSubmit={handleRegisterSubmit}>
          <input
            className="auth-input-field"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button className="auth-submit-btn" type="submit">Register</button>
        </form>
        {error && <p className="auth-error-message">{error}</p>}
        <p className="auth-switch-text">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
