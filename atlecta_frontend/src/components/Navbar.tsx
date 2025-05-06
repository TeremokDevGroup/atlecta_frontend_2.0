import { NavLink, useNavigate } from "react-router-dom";
import { getAccessToken, clearAccessToken } from "../services/http";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = !!getAccessToken();

  const handleLogout = () => {
    clearAccessToken();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white w-full px-4 py-2 fixed top-0 left-0 z-50">
      <ul className="flex gap-4">
        <li><NavLink to="/map" className={({ isActive }) => isActive ? "underline" : ""}>Карта</NavLink></li>
        <li><NavLink to="/profile" className={({ isActive }) => isActive ? "underline" : ""}>Профиль</NavLink></li>
        <li><NavLink to="/login" className={({ isActive }) => isActive ? "underline" : ""}>Вход</NavLink></li>
        <li><NavLink to="/register" className={({ isActive }) => isActive ? "underline" : ""}>Регистрация</NavLink></li>
        {isAuth && (
          <li>
            <NavLink
              to="/login"
              onClick={handleLogout}
              className={({ isActive }) => isActive ? "underline" : ""}
            >
              Выйти
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
