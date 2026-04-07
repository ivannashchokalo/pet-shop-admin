import { Navigate, Outlet } from "react-router";
import { useCheckAuthQuery } from "../../services/authApi";

export default function AuthRedirect() {
  const { data, isLoading, isFetching } = useCheckAuthQuery();

  // if (isLoading || isFetching) {
  //   return <p>Loading...</p>;
  // }

  if (data?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
