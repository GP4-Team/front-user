import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import SocialLoginButtons from '../auth/SocialLoginButtons';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { login, loading, error } = useAuth();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const validateForm = () => {
    const newErrors = {};
    // Validation logic
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(formData.email, formData.password);
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };
  
  return (
    <div className="login-form-container">
      <h2>Sign In</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        
        <Button type="submit" loading={loading}>
          Sign In
        </Button>
      </form>
      
      <div className="divider">Or continue with</div>
      
      <SocialLoginButtons />
      
      <div className="register-link">
        Don't have an account? <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;