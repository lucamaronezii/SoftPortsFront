import React from 'react'
import { ConfigProvider as Configuration } from 'antd';
import { token } from '../styles/theme'

interface IConfigProviderProps {
    children: React.ReactNode
}

const ConfigProvider: React.FC<IConfigProviderProps> = ({ children }) => {
    return (
        <Configuration
            theme={{
                token: token
            }}
        >
            {children}
        </Configuration>
    )
}

export default ConfigProvider
