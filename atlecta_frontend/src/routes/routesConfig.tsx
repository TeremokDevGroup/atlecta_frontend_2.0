import YandexMapPage from "../pages/YandexMapPage";
import ProfilePage from "../pages/ProfilePage";
import NotFound from "../pages/NotFound";
import FeedPage from "../pages/FeedPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { UserProfilePage } from "../pages/UserProfilePage";

export const routes = [
  { path: "map", element: <YandexMapPage />, private: false },
  { path: "login", element: <LoginPage />, private: false },
  { path: "register", element: <RegisterPage />, private: false },
  { path: "profile", element: <ProfilePage />, private: true },
  { path: "users/profiles", element: <FeedPage />, private: true },
  { path: "/profile/:user_id", element: <UserProfilePage />, private: true },
  { path: "*", element: <NotFound />, private: false },
];
