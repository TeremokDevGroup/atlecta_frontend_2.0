// src/components/LoginForm.tsx
import { useState } from 'react';
import { login } from '../services/authService';
import { useAuthToken } from "../hooks/useAuthToken";

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setToken } = useAuthToken();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await login(username, password);
            const token = response.data.access_token;
            console.log(response.data.access_token);
            setToken(token);
            alert('Успешный вход!');
        } catch {
            setError('Неверные данные для входа');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 p-6 border rounded-xl shadow">
            <input
                type="email"
                placeholder="Email"
                value={username}
                onChange={e => setUsername(e.target.value)}
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


