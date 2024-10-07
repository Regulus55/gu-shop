import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home, Login, NotFound, Signup } from "./pages";
import ForgotEmail from "pages/Auth/ForgotEmail";
import ForgotPassword from "pages/Auth/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot/email",
        element: <ForgotEmail />,
      },
      {
        path: "/forgot/password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default router;
