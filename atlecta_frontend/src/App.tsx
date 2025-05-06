import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { YandexMapPage } from "./pages/YandexMapPage"; 
import ProfilePage from "./pages/ProfilePage"; 
import { LoginPage } from "./pages/LoginPage"; 
import { RegisterPage } from "./pages/RegisterPage"; 
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="map" element={<YandexMapPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
