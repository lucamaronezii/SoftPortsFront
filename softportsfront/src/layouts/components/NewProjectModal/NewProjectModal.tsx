import { ProjectFilled } from '@ant-design/icons'
import { message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAxios } from '../../../auth/useAxios'
import { TitleModal } from '../../../components/CustomRow/styles'
import TitleInput from '../../../components/TitleInput/TitleInput'
import TitleSelect from '../../../components/TitleSelect/TitleSelect'
import TitleTextArea from '../../../components/TitleTextArea/TitleTextArea'
import useProjects from '../../../hooks/useProjects'
import { IUser } from '../../../pages/Users/interfaces'
import { IProject } from '../../interfaces'
import { INewProjectModalProps } from './interfaces'
import { StyledFieldsContainer } from './styles'

const NewProjectModal: React.FC<INewProjectModalProps> = ({ open, onClose }) => {
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true)
    const [users, setUsers] = useState<IUser[]>([])
    const [selectedUsers, setSelectedUsers] = useState<number[]>([])
    const [messageApi, contextHolder] = message.useMessage();
    const { projects, setProjects } = useProjects()

    const axios = useAxios()

    const handleSuccess = (newItem: IProject) => {
        messageApi.success(`Projeto ${title} criado com sucesso.`)
        setProjects([...projects, newItem])
        onClose()
        setSelectedUsers([])
        setTitle('')
    }

    const handleForm = () => {
        if (!title?.length) {
            messageApi.error('O campo de nome não pode ser vazio.'); return false
        } else return true
    }

    const handleGetAllUsers = async () => {
        await axios.get('usuario')
            .then(res => setUsers(res.data.conteudo))
            .catch(err => console.error(err))
            .finally(() => setLoadingUsers(false))
    }

    const createProject = async () => {
        if (!handleForm()) return
        setLoading(true)
        const body = {
            nome: title,
            organizacaoId: 1,
            usuarios: selectedUsers
        }
        await axios.post('/projeto', body)
            .then(res => handleSuccess(res.data))
            .catch(_ => message.error("Erro. Tente novamente"))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        handleGetAllUsers()
    }, [])

    return (
        <React.Fragment>
            {contextHolder}
            <Modal
                title={<TitleModal><ProjectFilled />Novo projeto</TitleModal>}
                open={open}
                destroyOnClose
                centered
                confirmLoading={loading}
                onCancel={onClose}
                onOk={createProject}
            >
                <StyledFieldsContainer>
                    <TitleInput
                        text='Nome'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='Digite o nome do projeto'
                    />
                    <TitleSelect
                        text='Usuários'
                        mode='multiple'
                        options={users}
                        value={selectedUsers}
                        onChange={(e) => setSelectedUsers(e)}
                        fieldNames={{ label: "nome", value: "id" }}
                        placeholder={'Selecione os usuários relacionados ao projeto'}
                    />
                </StyledFieldsContainer>
            </Modal>
        </React.Fragment>
    )
}

export default NewProjectModal
