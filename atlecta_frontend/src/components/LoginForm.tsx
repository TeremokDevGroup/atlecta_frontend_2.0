// src/components/LoginForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuthToken } from "../hooks/useAuthToken";

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { setToken } = useAuthToken();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await login(email, password);
            const token = response.data.access_token;
            setToken(token);
            // alert('Успешный вход!');
            navigate('/feed');
        } catch {
            setError('Неверные данные для входа');
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">ВХОД В АККАУНТ</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type="email"
                        placeholder="E-MAIL"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none 
                                  focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none 
                                  focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <label className="ml-1 text-sm text-gray-600">  Запомнить меня</label>
                    </div>
                    <button
                        type="button"
                        className="text-sm text-white hover:text-gray-800"
                        onClick={() => alert('Восстановление пароля')}
                    >
                        Забыли пароль?
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-lg hover:text-gray-800 
                              transition duration-200 font-medium text-lg"
                >
                    ВОЙТИ
                </button>
                <div className="text-center pt-2">
                    <button
                        type="button"
                        className="text-white hover:text-blue-800 text-sm font-medium transition duration-200"
                        onClick={() => window.location.href = '/register'}
                    >
                        НЕТ АККАУНТА? ЗАРЕГИСТРИРОВАТЬСЯ
                    </button>
                </div>
            </form>
        </div>
    );
};