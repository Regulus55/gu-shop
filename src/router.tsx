import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  AdminAdd,
  AdminEdit,
  AdminList,
  AllProducts,
  Collections,
  ForgotEmail,
  ForgotPassword,
  ChangePassword,
  Profile,
  EditProfile,
  Home,
  Login,
  NotFound,
  ProductDetail,
  Signup,
  Carts,
} from "./pages";

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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit/profile",
        element: <EditProfile />,
      },
      {
        path: "/forgot/email",
        element: <ForgotEmail />,
      },
      {
        path: "/forgot/password",
        element: <ForgotPassword />,
      },
      {
        path: "/change/password",
        element: <ChangePassword />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/product/new",
        element: <AdminList />,
      },
      {
        path: "/product/add",
        element: <AdminAdd />,
      },
      {
        path: "/product/edit/:id",
        element: <AdminEdit />,
      },
      {
        path: "/collections",
        element: <Collections />,
      },
      {
        path: "/allproducts",
        element: <AllProducts />,
      },
      {
        path: "/carts",
        element: <Carts />,
      },
    ],
  },
]);

export default router;
