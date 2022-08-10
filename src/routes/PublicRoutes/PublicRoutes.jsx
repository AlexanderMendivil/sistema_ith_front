import { Navigate } from "react-router-dom"

export const PublicRoutes = ( { children } ) => {

    const user = localStorage.getItem('user-lab');
  return ( user ) ? <Navigate to='/'/> : children;
}
