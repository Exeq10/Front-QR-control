
import "bootstrap/dist/css/bootstrap.min.css";

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

import UserProvider from "./context/UserProvider.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/select" element={<Options />} />

      <Route path="*" element={<ErrorElement />} />

      {/* Protected routes */}
      <Route
        element={<ProtectedRoutes />}
        errorElement={<ErrorElement />}></Route>
    </>,
  ),
);

function App() {
  return (
    

<UserProvider>

      <section className="d-flex flex-column justify-content-center align-items-center ">
        <RouterProvider router={router} />
      </section>
</UserProvider>
    
  );
}

export default App;
