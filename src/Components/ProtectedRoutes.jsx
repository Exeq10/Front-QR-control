import {Outlet, Navigate} from "react-router-dom";

import { useContext } from "react";
import { userContext } from "../context/UserProvider";
function ProtectedRoutes() {
 
const {auth} = useContext(userContext)


  if (!auth) {
    return <Navigate to="/login" />;
  }

  return <Outlet auth={auth} />;
}

export default ProtectedRoutes;
