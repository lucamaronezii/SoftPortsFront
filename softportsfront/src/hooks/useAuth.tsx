import { useEffect, useRef, useState } from 'react'
import Keycloak from 'keycloak-js'

const useAuth = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const isRun = useRef(false)

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        const client = new Keycloak({
            url: process.env.REACT_APP_KEYCLOAK_URL,
            realm: process.env.REACT_APP_KEYCLOAK_REALM!,
            clientId: process.env.REACT_APP_KEYCLOAK_CLIENT!,
        })

        client.init({ onLoad: "login-required" }).then((res) => {
            setIsLogged(res)
            console.log(res)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    return isLogged
}

export default useAuth
