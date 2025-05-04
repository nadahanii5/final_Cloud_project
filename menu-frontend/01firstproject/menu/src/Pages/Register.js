import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'بريد إلكتروني غير صالح';
    if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة';
    else if (formData.password.length < 6) newErrors.password = 'يجب أن تكون كلمة المرور 6 أحرف على الأقل';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await register(formData);
      navigate('/');
    } catch (error) {
      setErrors({
        server: error.response?.data?.message || 'حدث خطأ أثناء التسجيل'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">تسجيل حساب جديد</h2>
        
        {errors.server && (
          <div className="alert alert-error">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              الاسم الكامل
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="أدخل اسمك الكامل"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="أدخل بريدك الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="أدخل كلمة المرور (6 أحرف على الأقل)"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'جاري إنشاء الحساب...' : 'تسجيل'}
          </button>
        </form>

        <div className="auth-links">
          <span>لديك حساب بالفعل؟</span>
          <Link to="/login" className="auth-link">
            سجل الدخول هنا
          </Link>
          
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-outline-secondary home-button"
          >
            العودة إلى الصفحة الرئيسيه
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;

