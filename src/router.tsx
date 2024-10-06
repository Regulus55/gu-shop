import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import {Home, Login, NotFound, Signup} from "./pages";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFound/>, children: [
            {
                index: true,
                path: '/',
                element: <Home/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/login',
                element: <Login/>
            },
        ]
    }
])

export default router