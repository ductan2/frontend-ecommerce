
import { Navigate } from "react-router-dom";



type PrivateRouterProps = {
   children: React.ReactNode;
}
export const PrivateRoutes = ({ children }: PrivateRouterProps) => {
   const token = localStorage.getItem('token');

   return token !== null ? children : <Navigate to="/login" replace={true} />;
}
