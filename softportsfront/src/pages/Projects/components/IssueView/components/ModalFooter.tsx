import { CheckOutlined, RollbackOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAxios } from '../../../../../auth/useAxios'
import { IModalFooter } from './interfaces'
import { FooterFlex } from './styles'
import { jwtDecode } from 'jwt-decode'
import { useKeycloak } from '@react-keycloak/web'
import { IUser } from '../../../../Users/interfaces'

const ModalFooter: React.FC<IModalFooter> = ({ onSave, selected, onCloseIssue, loading, closed, issue, created }) => {
    const [input, setInput] = useState<string>()
    const [loadingPut, setLoadingPut] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()
    const [userId, setUserId] = useState<number>()
    const { keycloak } = useKeycloak()
    const axios = useAxios()
    const nameInKeycloak = jwtDecode<any>(keycloak.idToken!).given_name

    const handleFindUser = (response: IUser[]) => {
        console.log(response)
        const activeUser = response.find(user => user.nome == nameInKeycloak)
        if (activeUser) {
            setUserId(activeUser.id)
        } else {
            console.error("User not found")
        }
    }

    const handleSuccess = () => {
        setInput('')
        messageApi.success('Comentário registrado com sucesso.')
        created()
    }

    const handleGetAllUsers = async () => {
        await axios.get('usuario')
            .then(res => handleFindUser(res.data.conteudo))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        handleGetAllUsers()
    }, [])

    const handleCreateComment = async () => {
        if (!input?.length || !userId) return
        setLoadingPut(true)
        setTimeout(async () => {
            await axios.put(`tarefa/comentario/${issue.id}?conteudo=${input}&usuarioId=${userId}`)
                .then(_ => handleSuccess())
                .catch(err => console.error(err))
                .finally(() => setLoadingPut(false))
        }, 1500)
    }

    return (
        <>
            {contextHolder}
            <Flex align='center'>
                {selected === "comments" &&
                    <Flex gap={10} style={{ width: '50%' }}>
                        <Avatar
                            onClick={() => console.log(userId)}
                            icon={<UserOutlined />}
                            style={{ minWidth: '31px' }}
                        />
                        <Input.Search
                            placeholder='Digite seu comentário'
                            value={input}
                            loading={loadingPut}
                            enterButton={<SendOutlined />}
                            onSearch={handleCreateComment}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </Flex>
                }
                <FooterFlex>
                    <Button
                        icon={closed ? <RollbackOutlined /> : <CheckOutlined />}
                        iconPosition='end'
                        loading={loading}
                        onClick={onCloseIssue}>
                        {closed ? 'Reabrir' : 'Fechar'} ocorrência
                    </Button>
                    <Button
                        type="primary"
                        onClick={onSave}
                        loading={loading}>
                        Salvar</Button>
                </FooterFlex>
            </Flex>
        </>
    )
}

export default ModalFooter
