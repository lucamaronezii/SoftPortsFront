import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import MainLayout from '../layouts/MainLayout'
import NotFound from '../pages/NotFound/NotFound'

const Router = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <NotFound />,
            children: [
                { path: '/', element: <Dashboard /> }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default Router
