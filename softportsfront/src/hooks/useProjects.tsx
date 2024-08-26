import { useContext } from 'react'
import { ProjectsCtx } from '../context/ProjectsContext'

const useProjects = () => {
    const ctx = useContext(ProjectsCtx)
    return ctx
}

export default useProjects
