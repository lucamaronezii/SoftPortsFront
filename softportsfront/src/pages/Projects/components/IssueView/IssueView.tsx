import { Button, Flex, Modal, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { IIssueView } from './interfaces'
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { CustomCol, CustomRow, colProps } from './styles'
import TitleInput from '../../../../components/TitleInput/TitleInput'
import TitleSelect from '../../../../components/TitleSelect/TitleSelect'
import TitleTextArea from '../../../../components/TitleTextArea/TitleTextArea'
import { usersList } from '../../../../mocks/Users'
import Popdelete from '../../../../components/Popdelete/Popdelete'
import TitleDatePicker from '../../../../components/TitleDatePicker/TitleDatePicker'
import dayjs from 'dayjs'
import { IClassification } from '../../interfaces'

const IssueView: React.FC<IIssueView> = ({ open, onClose, issue }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [so, setSo] = useState<string>('')
    const [classif, setClassif] = useState<IClassification[]>([])
    const [priority, setPriority] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [road, setRoad] = useState<string>('')

    useEffect(() => {
        if (issue) {
            setTitle(issue.titulo)
            setDesc(issue.descricao)
            setSo(issue.versaoSO || '')
            setClassif(issue.classificacoes)
            setPriority(issue.prioridade)
            setStatus(issue.status)
            setRoad(issue.caminho || '')
        }
    }, [issue])

    const inputVariant = () => {
        return isEditing ? 'outlined' : 'filled'
    }

    if (!issue) {
        return null // Ou você pode retornar um spinner ou mensagem de erro
    }

    return (
        <Modal
            centered
            closable
            width={1200}
            open={open}
            onCancel={() => { onClose(); setIsEditing(false) }}
            destroyOnClose
            title={
                <Flex align='center' gap={15}>
                    {issue.titulo || null}
                    <Flex gap={10}>
                        <Tooltip placement='top' title={'Editar campos'}>
                            <Button
                                type={isEditing ? 'primary' : 'dashed'}
                                onClick={() => setIsEditing(!isEditing)}
                                icon={isEditing ? <CheckOutlined /> : <EditOutlined />}
                                size='small'
                            />
                        </Tooltip>
                        <Popdelete
                            title={'Excluir problema'}
                            description={'Tem certeza que deseja excluir o problema?'}
                        >
                            <Button
                                icon={<DeleteOutlined />}
                                size='small'
                                danger
                                type='primary'
                            />
                        </Popdelete>
                    </Flex>
                </Flex>
            }
            footer={[
                <Button key="save" type="primary" >
                    Salvar
                </Button>
            ]}
        >
            <CustomRow>
                <CustomCol {...colProps}>
                    <TitleInput
                        text='Título'
                        readOnly={!isEditing}
                        variant={inputVariant()}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </CustomCol>
                <CustomCol {...colProps}>
                    <TitleSelect
                        text='Classificação'
                        value={classif}
                        style={!isEditing ? { pointerEvents: "none" } : {}}
                        variant={inputVariant()}
                        removeIcon={!isEditing}
                        mode='multiple'
                    />
                </CustomCol>
                <CustomCol {...colProps}>
                    <TitleSelect
                        text='Prioridade'
                        value={priority}
                        style={!isEditing ? { pointerEvents: "none" } : {}}
                        variant={inputVariant()}
                        removeIcon={!isEditing}
                    />
                </CustomCol>
            </CustomRow>

            <CustomRow>
                <CustomCol {...colProps}>
                    <TitleTextArea
                        text='Descrição'
                        rows={3}
                        readOnly={!isEditing}
                        variant={inputVariant()}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </CustomCol>
                <CustomCol {...colProps}>
                    <TitleSelect
                        text='Status'
                        value={status}
                        style={!isEditing ? { pointerEvents: "none" } : {}}
                        variant={inputVariant()}
                        removeIcon={!isEditing}
                    />
                </CustomCol>
                <CustomCol {...colProps}>
                    <TitleSelect
                        text='Caminho entre telas'
                        value={road}
                        style={!isEditing ? { pointerEvents: "none" } : {}}
                        variant={inputVariant()}
                        removeIcon={!isEditing}
                    />
                </CustomCol>
            </CustomRow>

            <CustomRow>
                <CustomCol {...colProps}>
                    <TitleInput
                        text='Versão do SO'
                        readOnly={!isEditing}
                        variant={inputVariant()}
                        value={so}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </CustomCol>
                <CustomCol {...colProps}>
                    <TitleDatePicker
                        text='Data estimada para correção'
                        style={!isEditing ? { pointerEvents: "none" } : {}}
                        value={dayjs()}
                        variant={inputVariant()}
                        removeIcon={!isEditing}
                    />
                </CustomCol>
                <CustomCol {...colProps}>
                    <TitleSelect
                        text='Responsáveis'
                        style={!isEditing ? { pointerEvents: "none" } : {}}
                        variant={inputVariant()}
                        removeIcon={!isEditing}
                        options={usersList}
                        mode='multiple'
                    />
                </CustomCol>
            </CustomRow>

            <CustomRow justify={'start'}>
                <CustomCol {...colProps}>
                    <TitleSelect
                        text='Caso de teste'
                        style={!isEditing ? { pointerEvents: "none" } : {}}
                        removeIcon={!isEditing}
                        variant={inputVariant()}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </CustomCol>
                <CustomCol {...colProps}>
                    <TitleSelect
                        text='Screenshots'
                        style={!isEditing ? { pointerEvents: "none" } : {}}
                        variant={inputVariant()}
                        removeIcon={!isEditing}
                    />
                </CustomCol>
            </CustomRow>
        </Modal>
    )
}

export default IssueView
