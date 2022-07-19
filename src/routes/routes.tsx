import { User } from "firebase/auth";
import Dashboard from "../pages/Dashboard/Dashboard";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/Login/Login";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

interface PropsType {
  user: User
}

const routes = (props: PropsType) => {
  return [
    {
      path: "/login",
      element: <AuthRoutes><Login /></AuthRoutes>
    },
    {
      path: '/',
      element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>,
      children: [
        { path: '/', element: <Homepage /> },
        { path: '/notes', element: <></> }
      ]
    }
  ]
}

export default routes;