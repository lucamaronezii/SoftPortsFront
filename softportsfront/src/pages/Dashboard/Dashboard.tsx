import { message } from 'antd';
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const Dashboard = () => {
    const location = useLocation()
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        message.destroy()
        if (location.state?.deleted) {
            messageApi.success(`Projeto ${location.state?.deleted} excluído com sucesso.`)
        }
    }, [location.state])

    return (
        <div>
            {contextHolder}
            dash
        </div>
    )
}
