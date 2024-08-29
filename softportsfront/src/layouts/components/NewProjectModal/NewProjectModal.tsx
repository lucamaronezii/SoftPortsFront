import { ProjectFilled } from '@ant-design/icons'
import { message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAxios } from '../../../auth/useAxios'
import { usersList } from '../../../mocks/Users'
import { TitleModal } from '../../../components/CustomRow/styles'
import TitleInput from '../../../components/TitleInput/TitleInput'
import TitleSelect from '../../../components/TitleSelect/TitleSelect'
import TitleTextArea from '../../../components/TitleTextArea/TitleTextArea'
import { INewProjectModalProps } from './interfaces'
import { StyledFieldsContainer } from './styles'
import useProjects from '../../../hooks/useProjects'
import { IProject } from '../../interfaces'
import { IUser } from '../../../pages/Users/interfaces'

const NewProjectModal: React.FC<INewProjectModalProps> = ({ open, onClose }) => {
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true)
    const [users, setUsers] = useState<IUser[]>([])
    const [messageApi, contextHolder] = message.useMessage();
    const { projects, setProjects } = useProjects()

    const axios = useAxios()

    const handleSuccess = (newItem: IProject) => {
        messageApi.success(`Projeto ${title} criado com sucesso.`)
        setProjects([...projects, newItem])
        onClose()
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
            organizacaoId: 1
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
                    <TitleTextArea
                        text='Descrição'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder='Digite a descrição do projeto'
                        rows={7}
                    />
                    <TitleSelect
                        text='Usuários'
                        mode='multiple'
                        options={users}
                        fieldNames={{ label: "nome", value: "id" }}
                        placeholder={'Selecione os usuários relacionados ao projeto'}
                    />
                </StyledFieldsContainer>
            </Modal>
        </React.Fragment>
    )
}

export default NewProjectModal
