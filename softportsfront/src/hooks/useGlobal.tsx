import React, { useContext } from 'react'
import { GlobalCtx } from '../context/GlobalContext'

const useGlobal = () => {
    const ctx = useContext(GlobalCtx)
    return ctx
}

export default useGlobal
