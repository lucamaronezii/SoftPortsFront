import { useKeycloak } from '@react-keycloak/web'
import React, { useEffect } from 'react'
import { useAxios } from '../../auth/useApi'

export const Dashboard = () => {
    const axios = useAxios()

    const fodase = async () => {
        const response = await axios.get('/projeto')
        console.log(response)
    }

    useEffect(() => {
        fodase()
    }, [])

    return (
        <div>
            dash
        </div>
    )
}
