import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { useEffect, useMemo } from "react";

export const useKeycloakServer = () => {
    const { keycloak } = useKeycloak();
    let access_token = ''

    const body = {
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_KEYCLOAK_CLIENT,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
    }

    const getClientToken = async () => {
        await axios.post(`${process.env.REACT_APP_KEYCLOAK_URL}admin/realms/softports/protocol/openid-connect/token`, body, {
            headers: {
                'Authorization': `Bearer ${keycloak.idToken}`
            }
        })
            .then(res => access_token = res.data.access_token)
    }

    const axiosKeycloak = useMemo(() => {
        const instance = axios.create({
            baseURL: `${process.env.REACT_APP_KEYCLOAK_URL}admin/realms/softports`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
        });

        return instance;

    }, [keycloak?.token]);

    useEffect(() => {
        getClientToken()
    }, [keycloak.idToken])

    return axiosKeycloak;
};
