import React from 'react'
import { ConfigProvider as Configuration, theme } from 'antd';
import { components, token } from '../styles/theme'

interface IConfigProviderProps {
    children: React.ReactNode
}

const ConfigProvider: React.FC<IConfigProviderProps> = ({ children }) => {
    return (
        <Configuration
            theme={{
                token: token,
                components: components,
                algorithm: theme.darkAlgorithm
            }}
        >
            {children}
        </Configuration>
    )
}

export default ConfigProvider
