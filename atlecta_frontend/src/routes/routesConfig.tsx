// src/routes/routesConfig.ts
import { YandexMapPage } from "../pages/YandexMapPage";
import ProfilePage from "../pages/ProfilePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import NotFound from "../pages/NotFound";

export const routes = [
  { path: "map", element: <YandexMapPage />, private: true },
  { path: "profile", element: <ProfilePage />, private: true },
  { path: "login", element: <LoginPage />, private: false },
  { path: "register", element: <RegisterPage />, private: false },
  { path: "*", element: <NotFound />, private: false },
];
