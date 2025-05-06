import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { getAccessToken } from "../services/http";

interface Props {
    children: ReactNode;
  }

  const ProtectedRoute = ({ children }: Props) => {
    const token = getAccessToken();
    return token ? children : <Navigate to="/login" replace />;
  };

export default ProtectedRoute;
