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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/camera" element={<Camera />} />

      <Route path="*" element={<ErrorElement />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoutes />} errorElement={<ErrorElement />}>
        <Route path="/" element={<Options />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
    </>,
  ),
);

function App() {
  return (
    <UserProvider>
      <section className="d-flex flex-column justify-content-center align-items-center bg-light   ">
        <RouterProvider router={router} />
      </section>
    </UserProvider>
  );
}

export default App;
