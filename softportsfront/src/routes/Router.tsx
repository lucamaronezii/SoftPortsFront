import { useKeycloak } from '@react-keycloak/web'
import { useContext, useEffect, useState } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Backroom from '../pages/Backroom/Backroom'
import Configurations from '../pages/Configurations/Configurations'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import NotFound from '../pages/NotFound/NotFound'
import Projects from '../pages/Projects/Projects'
import Users from '../pages/Users/Users'
import useRoles from '../hooks/useRoles'
import { RolesCtx } from '../context/RolesContext'

const Router = () => {
    const { keycloak, initialized } = useKeycloak();
    const { setRoles } = useContext(RolesCtx);

    useEffect(() => {
        if (keycloak && initialized) {
            setRoles(keycloak.tokenParsed?.realm_access?.roles || []);
        }
    }, [keycloak, initialized, setRoles]);

    const router = createBrowserRouter([
        {
            path: '/',
            element: keycloak.authenticated ? <MainLayout /> : <Navigate to='/antessala' />,
            errorElement: <NotFound />,
            children: [
                { path: '/', element: <Dashboard /> },
                { path: '/projetos', element: <Projects /> },
                { path: '/usuarios', element: <Users /> },
                { path: '/config', element: <Configurations /> },
            ],
        },
        {
            path: '/antessala',
            element: <Backroom />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router