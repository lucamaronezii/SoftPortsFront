import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { IProject } from '../layouts/interfaces';

interface IProjectsContextProps {
    children: React.ReactNode
}

interface IProjectsContextData {
    projects: IProject[];
    setProjects: Dispatch<SetStateAction<IProject[]>>;
    selectedProject: IProject;
    setSelectedProject: Dispatch<SetStateAction<IProject>>;
}

export const ProjectsCtx = createContext<IProjectsContextData>({} as IProjectsContextData)

const ProjectsContext: React.FC<IProjectsContextProps> = ({ children }) => {
    const [projects, setProjects] = useState<IProject[]>([])
    const [selectedProject, setSelectedProject] = useState<IProject>({ id: -1, nome: '' })

    return (
        <ProjectsCtx.Provider
            value={{
                projects: projects,
                setProjects: setProjects,
                selectedProject: selectedProject,
                setSelectedProject: setSelectedProject
            }}
        >
            {children}
        </ProjectsCtx.Provider>
    )
}

export default ProjectsContext
