import { Routes, Route } from "react-router-dom"
import { PublicRoutes } from "./PublicRoutes/PublicRoutes"
import { AuthRoutes } from "./PublicRoutes/AuthRoutes"
import { PrivateRoutes } from "./PrivateRoutes/PrivateRoutes"
import { Home } from "../pages/Login/Home/Home"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/auth/*' element={
            <PublicRoutes>
                <AuthRoutes />
            </PublicRoutes>
        }/>
        <Route path='/' element={
            <PrivateRoutes>
                <Home/>
            </PrivateRoutes>
        }/>
    </Routes>
  )
}
