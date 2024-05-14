import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { FaRegUser, FaRegEdit } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import adminContext from "../../context/AdminProvider";

function DashboardAdmin() {
  const { nameAdmin } = useContext(adminContext);
  const location = useLocation();
 
  return (
    <section className="w-100 d-flex">
      {/* La siguiente línea agrega la clase 'd-none' en dispositivos móviles */}
      <div className="col-md-2 d-none d-md-block position-position-absolute bg-primary vh-100 text-center p-3 text-white m-0 p-0">
        <RiAdminLine fontSize={"150px"} />
        <h1 className="fs-4 text-white text-center">{nameAdmin}</h1>
        <h2 className="fs-6 mb-5">Panel de administración</h2>
        <div className="d-flex flex-column justify-content-between">
          <nav>
            <ul className="list-unstyled gap-3 d-flex flex-column">
              <li>
                <NavLink to="/dashboard" className={`nav-link px-3 py-2 rounded-2 text-white d-flex align-items-center gap-2 dashboard-link ${location.pathname === "/dashboard" ? "bg-black" : ""}`}>
                  <MdOutlineSpaceDashboard /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={`nav-link text-white px-3 py-2 d-flex align-items-center gap-2 dashboard-link ${location.pathname === "/register" ? "bg-black" : ""}`}>
                  <FaRegEdit /> Registros
                </NavLink>
              </li>
              <li>
                <NavLink to="/listemployees" className={`nav-link text-white px-3 py-2 d-flex align-items-center gap-2 dashboard-link ${location.pathname === "/listemployees" ? "bg-black" : ""}`}>
                  <FaRegUser /> Empleados
                </NavLink>
              </li>
            </ul>
          </nav>
          <Link className="mt-5 btn btn-danger" to={'/'}  >Cerrar Sesión</Link>
        </div>
      </div>

      <div className="d-flex col-md-10 vh-100 bg-light-subtle overflow-y-scroll">
        <Outlet />
      </div>
    </section>
  );
}

export default DashboardAdmin;
