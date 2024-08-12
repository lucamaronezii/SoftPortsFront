import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import MainLayout from '../layouts/MainLayout'
import NotFound from '../pages/NotFound/NotFound'
import Projects from '../pages/Projects/Projects'
import Users from '../pages/Users/Users'
import Configurations from '../pages/Configurations/Configurations'
import Login from '../pages/Login/Login'
import useAuth from '../hooks/useAuth'

const Router = () => {
    const isLogged = useAuth()

    const router = createBrowserRouter([
        {
            path: '/',
            element: isLogged ? <MainLayout /> : <Navigate to={'/login'} />,
            errorElement: <NotFound />,
            children: [
                { path: '/', element: <Dashboard /> },
                { path: '/projetos', element: <Projects /> },
                { path: '/usuarios', element: <Users /> },
                { path: '/config', element: <Configurations /> },
            ],
        },
        {
            path: '/login',
            element: <Login />
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default Router
