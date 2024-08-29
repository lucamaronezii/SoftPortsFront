import { Button, Flex, message } from 'antd'
import { useAxios } from '../../../auth/useAxios'
import useProjects from '../../../hooks/useProjects'
import { CustomBox } from '../styles'
import { useState } from 'react'
import GapColumn from '../../../components/Column/Column'
import TitleSelect from '../../../components/TitleSelect/TitleSelect'
import { ConfigBox } from './styles'
import { useNavigate } from 'react-router-dom'

const ProjectConfig = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { selectedProject, projects, setProjects } = useProjects()
    const navigate = useNavigate()
    const axios = useAxios()

    const handleSuccess = () => {
        const updatedProjects = projects.filter(project => project.id !== selectedProject.id)
        setProjects([...updatedProjects])
        navigate('/', { state: { deleted: selectedProject.nome } })
    }

    const deleteProject = async () => {
        setLoading(true)
        await axios.delete(`projeto/${selectedProject.id}`)
            .then(handleSuccess)
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    return (
        <CustomBox>
            <ConfigBox>
                <GapColumn>
                    <TitleSelect
                        text='Gerenciar usuários'
                    />
                </GapColumn>
                <Button
                    danger
                    type='primary'
                    onClick={deleteProject}
                    loading={loading}
                    disabled={loading}
                    style={{ width: "150px" }}
                >Excluir projeto
                </Button>
            </ConfigBox>
        </CustomBox>
    )
}

export default ProjectConfig
