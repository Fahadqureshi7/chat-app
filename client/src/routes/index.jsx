import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CheckPassword from "../pages/CheckPassword";
import CheckEmail from "../pages/CheckEmail";
import Home from "../pages/Home"
import Message from "../components/Message";
import Register from "../pages/Register";
import Authlayout from "../layout/index";
import ForgotPassword from "../pages/ForgotPassword";

const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>, 
        children: [{
            path : '/register' ,
            element : <Authlayout><Register/></Authlayout>
        },
        {
            path:'/password',
            element:<Authlayout><CheckPassword/></Authlayout>
        },
        {
            path:'/forgot-password',
            element:<Authlayout><ForgotPassword/></Authlayout>
        },
        {
            path :'/email',
            element : <Authlayout><CheckEmail/></Authlayout>
        },
        {
            path : '/',
            element: <Home/>,
            children :[{
                path:':userId',
                element : <Message/>
            }
        ]
    }
    ]
    }

])

export default router