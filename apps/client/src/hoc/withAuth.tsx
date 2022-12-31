import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../stores/useAuth";

type RouteType = ReturnType<typeof Route>;

export const withAuth = (route: RouteType): RouteType => {
  const isLoggedIn = useAuth((state) => state.loggedIn);

  if (!isLoggedIn) {
    return (
      <Route path={route?.props.path} element={<Navigate to="/login" />} />
    );
  }

  return route;
};
