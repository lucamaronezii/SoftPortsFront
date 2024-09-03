import { useKeycloak } from '@react-keycloak/web';
import { message } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const Dashboard = () => {
    const location = useLocation()
    const [messageApi, contextHolder] = message.useMessage();
    const {keycloak} = useKeycloak()


    useEffect(() => {
        console.log(jwtDecode(keycloak.idToken!))
        message.destroy()
        if (location.state?.deleted) {
            messageApi.success(`Projeto ${location.state?.deleted} excluído com sucesso.`)
        }
    }, [location.state])

    return (
        <div>
            {contextHolder}
            Dashboard
        </div>
    )
}
