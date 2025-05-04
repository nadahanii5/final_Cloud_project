// src/Context/AuthContext.js
import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// 1. إنشاء الكونتكست
const AuthContext = createContext();

// 2. الحالة الابتدائية
const initialState = {
  user: null,
  isLoading: true,
  error: null,
};

// 3. الريديوسر
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isLoading: false, error: null };
    case 'REGISTER':
      return { ...state, user: action.payload, isLoading: false, error: null };
    case 'LOGOUT':
      return { ...state, user: null, isLoading: false, error: null };
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'STOP_LOADING':
      return { ...state, isLoading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

// 4. المزود (Provider)
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch({ type: 'LOADING' });
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const res = await axios.get('http://localhost:8000/api/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch({ type: 'LOGIN', payload: res.data });
        } catch (error) {
          localStorage.removeItem('authToken');
          dispatch({ type: 'SET_ERROR', payload: 'فشل التحقق من التوكن' });
        }
      }
      dispatch({ type: 'STOP_LOADING' });
    };
    checkAuth();
  }, []);

  // دوال العمليات
  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOADING' });
      const res = await axios.post('http://localhost:8000/api/login', { email, password });
      localStorage.setItem('authToken', res.data.token);
      dispatch({ type: 'LOGIN', payload: res.data.user });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'بيانات الدخول غير صحيحة' });
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'LOADING' });
      const res = await axios.post('http://localhost:8000/api/register', userData);
      localStorage.setItem('authToken', res.data.token);
      dispatch({ type: 'REGISTER', payload: res.data.user });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'فشل تسجيل الحساب' });
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 5. استخدام الكونتكست
export const useAuth = () => useContext(AuthContext);
