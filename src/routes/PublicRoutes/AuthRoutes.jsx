import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from '../../pages/Login/Login'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/*' element={<Navigate to='/auth/login' />}/>
    </Routes>
  )
}
