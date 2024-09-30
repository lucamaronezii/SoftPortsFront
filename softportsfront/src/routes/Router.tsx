import { useKeycloak } from '@react-keycloak/web'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Backroom from '../pages/Backroom/Backroom'
import Configurations from '../pages/Configurations/Configurations'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import NotFound from '../pages/NotFound/NotFound'
import Projects from '../pages/Projects/Projects'
import Users from '../pages/Users/Users'

const Router = () => {
    const { keycloak } = useKeycloak();
    let tries = 0

    if (keycloak.onAuthRefreshError) {
        tries += 1
        if (tries == 2) {
            keycloak.logout()
        }
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: keycloak.authenticated ? <MainLayout /> : <Navigate to={'/antessala'} />,
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
            element: !keycloak.authenticated ? <Backroom /> : <Navigate to={'/'} />
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default Router
