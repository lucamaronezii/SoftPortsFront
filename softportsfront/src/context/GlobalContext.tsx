import React, { Dispatch, SetStateAction, createContext, useState } from 'react'

interface IGlobalContextProps {
    children: React.ReactNode
}

interface IGlobalContextData {
    projectName: string;
    setProjectName: Dispatch<SetStateAction<string>>;
}

export const GlobalCtx = createContext<IGlobalContextData>({} as IGlobalContextData)

const GlobalContext: React.FC<IGlobalContextProps> = ({ children }) => {
    const [projectName, setProjectName] = useState<string>('')

    return (
        <GlobalCtx.Provider
            value={{
                projectName: projectName,
                setProjectName: setProjectName
            }}
        >
            {children}
        </GlobalCtx.Provider>
    )
}

export default GlobalContext
