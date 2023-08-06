// import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { userApi } from "../redux/api/userApi";
import FullScreenLoader from "../components/Loader/FullScreenLoader";
import {
  getTokenSelector,
  getUserSelector,
} from "../redux/features/auth/userSelectors";
import { useAppSelector } from "../redux/store";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const isLoggedIn = useAppSelector(getTokenSelector);
  const user = useAppSelector(getUserSelector);

  // console.log(123, allowedRoles, 456, user);
  const location = useLocation();

  if (isLoggedIn && !user) {
    return <FullScreenLoader />;
  }

  return isLoggedIn && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : isLoggedIn && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
