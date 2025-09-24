import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const Login = ({ switchToRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { login, loading, error, setError } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(formData);
    if (result.success) {
      // Redirect to dashboard or home page
      window.location.href = '/';
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <br />
        <p>
          Don't have an account?{' '}
          <button onClick={switchToRegister} className="link-button">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;