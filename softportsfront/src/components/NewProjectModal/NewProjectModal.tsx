import { ProjectFilled } from '@ant-design/icons'
import { Flex, Modal } from 'antd'
import React, { useState } from 'react'
import { TitleModal } from '../CustomRow/styles'
import TitleInput from '../TitleInput/TitleInput'
import TitleTextArea from '../TitleTextArea/TitleTextArea'
import { INewProjectModalProps } from './interfaces'
import TitleSelect from '../TitleSelect/TitleSelect'
import { usersList } from '../../mocks/Users'

const NewProjectModal: React.FC<INewProjectModalProps> = ({ open, onClose }) => {
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()

    return (
        <Modal
            open={open}
            title={<TitleModal><ProjectFilled />Novo projeto</TitleModal>}
            onCancel={onClose}
            centered
        >
            <Flex
                gap={10}
                style={{ marginTop: 20 }}
                vertical
            >
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
                    rows={4}
                />
                <TitleSelect
                    text='Usuários'
                    mode='multiple'
                    options={usersList}
                    placeholder={'Selecione os usuários relacionados ao projeto'}
                />
            </Flex>
        </Modal>
    )
}

export default NewProjectModal
