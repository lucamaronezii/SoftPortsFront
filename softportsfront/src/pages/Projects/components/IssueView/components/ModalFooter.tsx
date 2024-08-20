import { CheckOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Input } from 'antd'
import React from 'react'
import { IModalFooter } from './interfaces'
import { FooterFlex } from './styles'

const ModalFooter: React.FC<IModalFooter> = ({ onSave, selected, onCloseIssue, loading }) => {
    return (
        <Flex align='center'>
            {selected === "comments" &&
                <Flex gap={10} style={{ width: '50%' }}>
                    <Avatar
                        icon={<UserOutlined />}
                        style={{ minWidth: '31px' }}
                    />
                    <Input.Search
                        placeholder='Digite seu comentário'
                        enterButton={<SendOutlined />}
                    />
                </Flex>
            }
            <FooterFlex>
                <Button
                    icon={<CheckOutlined />}
                    iconPosition='end'
                    onClick={onCloseIssue}>
                    Fechar problema
                </Button>
                <Button
                    type="primary"
                    onClick={onSave}
                    loading={loading}>
                    Salvar
                </Button>
            </FooterFlex>
        </Flex>
    )
}

export default ModalFooter
