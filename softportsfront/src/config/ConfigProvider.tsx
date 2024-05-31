import React from 'react'
import { ConfigProvider as Configuration, theme } from 'antd';
import { components, token } from '../styles/theme'
import pt_BR from 'antd/locale/pt_BR'

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
            locale={pt_BR}
        >
            {children}
        </Configuration>
    )
}

export default ConfigProvider
