import { Navigate, Outlet } from "react-router";
import { useGetMeQuery } from "../../services/authApi";
import { USER_ROLE } from "../../constants/usersRole";

export default function AuthRedirect() {
  const { data, isLoading, isFetching } = useGetMeQuery();

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (data?.role === USER_ROLE.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
