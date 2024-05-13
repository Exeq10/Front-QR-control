import {Outlet, Navigate} from "react-router-dom";

import {useContext} from "react";

import adminContext from "../context/AdminProvider";
function ProtectedRoutesAdmin() {
  const {authAdmin} = useContext(adminContext);

  if (!authAdmin) {
    return <Navigate to="/loginAdmin" />;
  }

  return <Outlet auth={authAdmin} />;
}

export default ProtectedRoutesAdmin;
