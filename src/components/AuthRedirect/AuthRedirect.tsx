import { Navigate, Outlet } from "react-router";
import { useGetMeQuery } from "../../services/authApi";
import { USER_ROLE } from "../../constants/usersRole";
import Loader from "../Loader/Loader";

export default function AuthRedirect() {
  const { data, isLoading, isFetching } = useGetMeQuery();

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (data?.role === USER_ROLE.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
