import { NavLink, useNavigate } from "react-router-dom";
import { getAccessToken, clearAccessToken } from "../services/http";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = !!getAccessToken();

  const handleLogout = () => {
    clearAccessToken();
    navigate("/login");
  };

  return (
    <nav className="bg-white text-blue-600 w-full px-6 py-3 fixed top-0 left-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
        {/* Лого и название */}
        <div className="flex items-center gap-2">
          <Logo className="w-7 h-7 text-[#4E4FEB]" />
          <span className="text-xl font-bold text-[#2C2C75]">Atlecta</span>
        </div>

        {/* Навигация */}
        <ul className="flex gap-6 items-center">
          <li>
            <NavLink
              to="/map"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${isActive ? "bg-blue-100 font-medium" : "hover:bg-blue-50"}`
              }
            >
              Карта
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users/profiles"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${isActive ? "bg-blue-100 font-medium" : "hover:bg-blue-50"}`
              }
            >
              Пользователи
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${isActive ? "bg-blue-100 font-medium" : "hover:bg-blue-50"}`
              }
            >
              Чат
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${isActive ? "bg-blue-100 font-medium" : "hover:bg-blue-50"}`
              }
            >
              Профиль
            </NavLink>
          </li>
          {!isAuth && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md ${isActive ? "bg-blue-100 font-medium" : "hover:bg-blue-50"}`
                  }
                >
                  Вход
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md ${isActive ? "bg-blue-100 font-medium" : "hover:bg-blue-50"}`
                  }
                >
                  Регистрация
                </NavLink>
              </li>
            </>
          )}
          {isAuth && (
            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md hover:bg-blue-50"
              >
                Выйти
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;