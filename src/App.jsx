import { lazy, Suspense } from "react";
import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorElement from "./Components/ErrorElement";

const Login = lazy(() => import("./Pages/Login"));
const Options = lazy(() => import("./Pages/Options"));
const Camera = lazy(() => import("./Pages/Camera.jsx"));
const UserProfile = lazy(() => import("./Pages/UserProfile.jsx"));
const LoginAdmin = lazy(() => import("./Pages/admin/LoginAdmin.jsx"));
const DashboardAdmin = lazy(() => import("./Pages/admin/DashboardAdmin.jsx"));
const PanelUsers = lazy(() => import("./Pages/admin/PanelUsers.jsx"));
const AddUser = lazy(() => import("./Pages/admin/AddUser.jsx"));
const ListEmployees = lazy(() => import("./Pages/admin/ListEmployees.jsx"));

import ProtectedRoutes from "./Components/ProtectedRoutes";
import ProtectedRoutesAdmin from "./Components/ProtectedRoutesAdmin.jsx";
import UserProvider from "./context/UserProvider.jsx";
import { AdminProvider } from "./context/AdminProvider.jsx";
import ConnectProvider from "./context/ConnectProvider.jsx";

const FallbackSpinner = () => (
  <div className="d-flex justify-content-center mt-5">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

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
        <Route path="/" element={<DashboardAdmin />}>
          <Route path="/dashboard" index={true} element={<PanelUsers />} />
          <Route path="/register" element={<AddUser />} />
          <Route path="/listemployees" element={<ListEmployees />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return (

    <ConnectProvider>

    <AdminProvider>
      <UserProvider>
        <section className="d-flex flex-column justify-content-center align-items-center bg-light">
          <Suspense fallback={<FallbackSpinner />}>
            <RouterProvider router={router} />
          </Suspense>
        </section>
      </UserProvider>
    </AdminProvider>
    </ConnectProvider>
  );
}

export default App;
