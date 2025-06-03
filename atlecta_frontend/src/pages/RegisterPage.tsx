// src/pages/RegisterPage.tsx
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1543357480-c60d400e7ef6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Контейнер формы с центрированием */}
      <div className="relative z-10 w-full max-w-md px-4">
        <RegisterForm />
      </div>
    </div>
  );
};