import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { useMemo } from "react";

export const useAxios = () => {
    const { keycloak } = useKeycloak();

    console.log(keycloak.token)

    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: process.env.REACT_APP_DEVELOPMENT_SERVER,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${keycloak.idToken}`
            },
        });

        return instance;

    }, [keycloak?.token]);

    return axiosInstance;
};
