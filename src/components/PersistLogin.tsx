import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useDataContext from "../hooks/useDataContext";

import Loading from "./Loading";

function getToken() {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user).token;
}

const PersistLogin = () => {
  const { user, fetchLoggedInUser, loading } = useDataContext();
  const authToken = getToken();
  useEffect(() => {
    if (!user.token) {
      fetchLoggedInUser(authToken);
    }
  }, [user.token]);
  return <>{loading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
