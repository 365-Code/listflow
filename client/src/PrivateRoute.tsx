import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Cookies from "universal-cookie";

const PrivateRoute = () => {
  const auth = useAuth();

  const cookies = new Cookies(new Cookies(null, { path: '/', secure: true }));
  cookies.set('myCat', 'Pacman');
  

  return <>{auth?.user ? <Outlet /> : <Navigate to={"/login"} />}</>;
};
export default PrivateRoute;
