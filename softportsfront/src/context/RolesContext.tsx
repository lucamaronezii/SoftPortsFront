import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { IProject } from '../layouts/interfaces';

interface IRolesContextProps {
    children: React.ReactNode
}

interface IRolesContextData {
    roles: string[];
    setRoles: Dispatch<SetStateAction<string[]>>;
}

export const RolesCtx = createContext<IRolesContextData>({} as IRolesContextData)

const RolesContext: React.FC<IRolesContextProps> = ({ children }) => {
    const [roles, setRoles] = useState<string[]>([])

    return (
        <RolesCtx.Provider
            value={{
                roles, setRoles
            }}
        >
            {children}
        </RolesCtx.Provider>
    )
}

export default RolesContext
