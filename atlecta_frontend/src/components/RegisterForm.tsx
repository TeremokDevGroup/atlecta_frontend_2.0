// src/components/RegisterForm.tsx
import { useState } from 'react';
import { register } from '../services/authService';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await register(email, password);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Ошибка при регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 p-6 border rounded-xl shadow">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">Успешная регистрация!</p>}
      <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Зарегистрироваться
      </button>
    </form>
  );
};
