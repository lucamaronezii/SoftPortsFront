import { SendOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Input } from 'antd'
import React from 'react'
import { IModalFooter } from './interfaces'

const ModalFooter: React.FC<IModalFooter> = ({ onSave, selected }) => {
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
            <Button
                type="primary"
                onClick={onSave}
                style={{ marginLeft: 'auto' }}
            >
                Salvar
            </Button>
        </Flex>
    )
}

export default ModalFooter
