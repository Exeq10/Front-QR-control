import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoutes from "./Components/ProtectedRoutes";
import ErrorElement from "./Components/ErrorElement";
import Login from "./Pages/Login";
import Options from "./Pages/Options";
import Camera from "./Pages/Camera.jsx";

import UserProvider from "./context/UserProvider.jsx";
import UserProfile from "./Pages/UserProfile.jsx";
import { AdminProvider } from "./context/AdminProvider.jsx";
import ProtectedRoutesAdmin from "./Components/ProtectedRoutesAdmin.jsx";
import LoginAdmin from "./Pages/admin/LoginAdmin.jsx";
import DashboardAdmin from "./Pages/admin/DashboardAdmin.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/loginAdmin" element={<LoginAdmin />} />


      <Route path="/camera" element={<Camera />} />

      <Route path="*" element={<ErrorElement />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoutes />} errorElement={<ErrorElement />}>
        <Route path="/" element={<Options />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      {/* Protected routesAdmin */}
      <Route element={<ProtectedRoutesAdmin />} errorElement={<ErrorElement />}>
        <Route path="/dashboard" element={<DashboardAdmin /> } />
       
      </Route>

    </>,
  ),
);

function App() {
  return (
    <AdminProvider>

    <UserProvider>
      <section className="d-flex flex-column justify-content-center align-items-center bg-light   ">
        <RouterProvider router={router} />
      </section>
    </UserProvider>
    </AdminProvider>
  );
}

export default App;
