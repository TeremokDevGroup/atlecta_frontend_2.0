// src/components/LoginForm.tsx
import { useState } from 'react';
import { login } from '../services/authService';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login(email, password);
            const token = response.data.token;

            localStorage.setItem('token', token);
            alert('Успешный вход!');
        } catch (err) {
            console.error(err);
            setError('Неверные данные');
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
            <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Войти
            </button>
        </form>
    );
};
