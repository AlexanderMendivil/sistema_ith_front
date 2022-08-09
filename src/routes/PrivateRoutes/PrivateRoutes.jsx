import { Navigate } from "react-router-dom"

export const PrivateRoutes = ( { children } ) => {

    const user = localStorage.getItem('user');
  return ( user ) ? children : <Navigate to='/auth/login'/>;
}
