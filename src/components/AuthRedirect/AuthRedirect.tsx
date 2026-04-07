import { Navigate, Outlet } from "react-router";
import { useCheckAuthQuery } from "../../services/authApi";

export default function AuthRedirect() {
  const { data } = useCheckAuthQuery();

  if (data?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
