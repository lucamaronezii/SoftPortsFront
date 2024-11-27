import React, { useContext } from 'react'
import { RolesCtx } from '../context/RolesContext'

const useRoles = () => {
    const { roles } = useContext(RolesCtx)

    const isIncluding = (role: string) => {
        return roles?.includes(role)
    }

    return { isIncluding }
}

export default useRoles
