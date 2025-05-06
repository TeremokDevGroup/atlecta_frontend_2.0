import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { routes } from "./routes/routesConfig";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map(({ path, element, private: isPrivate }) => (
            <Route
              key={path}
              path={path}
              element={isPrivate ? <ProtectedRoute>{element}</ProtectedRoute> : element}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;