import { Button, Flex, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAxios } from '../../../auth/useAxios'
import Popdelete from '../../../components/Popdelete/Popdelete'
import useProjects from '../../../hooks/useProjects'
import { IUser } from '../../Users/interfaces'
import { IProjectPage } from '../interfaces'
import { CustomBox } from '../styles'
import { ConfigBox, CustomButton, CustomCard, CustomText } from './styles'

const ProjectConfig: React.FC<IProjectPage> = ({ users }) => {
    const [relatedUsers, setRelatedUsers] = useState<IUser[]>([])
    const [allUsers, setAllUsers] = useState<IUser[]>([])
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
    const [loadingAllUsers, setLoadingAllUsers] = useState<boolean>(true)
    const [loadingNewUsers, setLoadingNewUsers] = useState<boolean>(false)
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>(users.map(user => user.id))
    const { selectedProject, projects, setProjects } = useProjects()
    const navigate = useNavigate()
    const axios = useAxios()

    const handleDeleted = () => {
        const updatedProjects = projects.filter(project => project.id !== selectedProject.id)
        setProjects([...updatedProjects])
        navigate('/', { state: { deleted: selectedProject.nome } })
    }

    const deleteProject = async () => {
        setLoadingDelete(true)
        await axios.delete(`projeto/${selectedProject.id}`)
            .then(handleDeleted)
            .catch(err => console.error(err))
            .finally(() => setLoadingDelete(false))
    }

    const handleSuccess = (res: any) => {
        const conteudo: any[] = res.data.conteudo
        const relatedUsers = users.map(user => user.id)
        const updatedUsers = conteudo.filter(user => !relatedUsers.includes(user.id))
        setAllUsers(updatedUsers)
    }

    const handleGetAllUsers = async () => {
        await axios.get('usuario')
            .then(handleSuccess)
            .catch(err => console.error(err))
            .finally(() => setLoadingAllUsers(false))
    }

    const handleSaveUsers = () => {
        // TO DO
    }

    useEffect(() => {
        setRelatedUsers(users)
        handleGetAllUsers()
    }, [])

    return (
        <CustomBox>
            <ConfigBox>
                <CustomCard
                    title='Gerenciar usuários do projeto'
                    bordered={false}
                >
                    <Flex vertical gap={12}>
                        <CustomText>Adicione ou remova usuários previamente cadastrados no sistema ao projeto.</CustomText>
                        <Select
                            mode='multiple'
                            value={selectedUserIds}
                            onChange={(e) => setSelectedUserIds(e)}
                            options={[...relatedUsers, ...allUsers]}
                            disabled={loadingAllUsers}
                            loading={loadingAllUsers}
                            fieldNames={{ label: "nome", value: "id" }}
                            style={{ width: "100%" }}
                        />
                        <CustomButton
                            loading={loadingNewUsers}
                            onClick={handleSaveUsers}
                        >Salvar
                        </CustomButton>
                    </Flex>
                </CustomCard>
                <CustomCard
                    title='Excluir projeto'
                    bordered={false}
                >
                    <Flex vertical gap={12}>
                        <CustomText>Uma vez excluído o projeto, não terá volta. Tenha certeza da sua ação.</CustomText>
                        <Popdelete
                            title={'Excluir projeto'}
                            description={`Tem certeza que deseja excluir o projeto ${selectedProject.nome}?`}
                            onConfirm={deleteProject}
                            placement="bottomLeft"
                        >
                            <Button
                                danger
                                type='primary'
                                loading={loadingDelete}
                                disabled={loadingDelete}
                                style={{ width: "150px" }}
                            >Excluir projeto
                            </Button>
                        </Popdelete>
                    </Flex>
                </CustomCard>
            </ConfigBox>
        </CustomBox>
    )
}

export default ProjectConfig
