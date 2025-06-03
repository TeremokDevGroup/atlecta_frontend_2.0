// src/components/RegisterForm.tsx
import { useState } from 'react';
import { register } from '../services/authService';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateEmail(email)) {
      setError('Введите корректный email');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
      await register(email, password);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Ошибка при регистрации');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">СОЗДАНИЕ АККАУНТА</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            placeholder="E-MAIL"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none 
                      focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 bg-gray-700"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none 
                      focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 bg-gray-700"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none 
                      focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 bg-gray-700"
            required
          />
        </div>
        
        {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm text-center py-2">
            Успешная регистрация! Теперь вы можете войти в систему.
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 
                    transition duration-200 font-medium text-lg"
        >
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            className="text-white hover:text-blue-800 text-sm font-medium transition duration-200"
            onClick={() => window.location.href = '/login'}
          >
            УЖЕ ЕСТЬ АККАУНТ? ВОЙТИ
          </button>
        </div>
      </form>
    </div>
  );
};