import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { IProject } from '../layouts/interfaces';

interface IGlobalContextProps {
    children: React.ReactNode
}

interface IGlobalContextData {
    projects: IProject[];
    setProjects: Dispatch<SetStateAction<IProject[]>>;
    selectedProject: IProject;
    setSelectedProject: Dispatch<SetStateAction<IProject>>;
}

export const GlobalCtx = createContext<IGlobalContextData>({} as IGlobalContextData)

const GlobalContext: React.FC<IGlobalContextProps> = ({ children }) => {
    const [projects, setProjects] = useState<IProject[]>([])
    const [selectedProject, setSelectedProject] = useState<IProject>({ id: -1, nome: '' })

    return (
        <GlobalCtx.Provider
            value={{
                projects: projects,
                setProjects: setProjects,
                selectedProject: selectedProject,
                setSelectedProject: setSelectedProject
            }}
        >
            {children}
        </GlobalCtx.Provider>
    )
}

export default GlobalContext
