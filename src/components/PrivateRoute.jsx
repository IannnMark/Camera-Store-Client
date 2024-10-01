import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({ isAdmin = false }) {
  const { currentUser } = useSelector((state) => state.user);

  //if not authenticated, redirect to sign-in
  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  // if isAdmin is true and the current user is not an admin, redirect to home page
  if (isAdmin && currentUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  //Otherwise, allow access to the protected route
  return <Outlet />;
}
