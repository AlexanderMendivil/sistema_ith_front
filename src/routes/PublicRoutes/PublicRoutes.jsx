import { Navigate } from "react-router-dom"

export const PublicRoutes = ( { children } ) => {

    localStorage.setItem('user-lab', {id: 1, name: 'admin', password: '123'})
    const user = localStorage.getItem('user-lab');
  return ( user ) ? <Navigate to='/'/> : children;
}
