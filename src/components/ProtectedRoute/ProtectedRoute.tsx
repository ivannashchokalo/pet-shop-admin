import { Navigate, Outlet } from "react-router";
import { useGetMeQuery } from "../../services/authApi";
import { USER_ROLE } from "../../constants/usersRole";
import Loader from "../Loader/Loader";

export default function ProtectedRoute() {
  const { data, isLoading, isFetching } = useGetMeQuery();

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!data || data.role !== USER_ROLE.ADMIN) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
