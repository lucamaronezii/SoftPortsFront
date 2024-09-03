import { UserOutlined } from '@ant-design/icons'
import { Avatar, Flex, Typography } from 'antd'
import React from 'react'
import { ISubPage } from './interfaces'
import { CommentTime, SectionFlex } from './styles'

const IssueComments: React.FC<ISubPage> = ({ issue }) => {
  const { Text } = Typography

  const handleCreateComment = () => {
    
  }

  return (
    <SectionFlex>
      {issue.comentarios!.map((value) => (
        <Flex gap={12}>
          <Avatar
            icon={<UserOutlined />}
            style={{ minWidth: '31px' }}
          />
          <Flex vertical gap={5}>
            <Flex gap={12}>
              <Text style={{ fontWeight: '500' }}>{value.nome}</Text>
              <CommentTime>{value.dataCriacao}</CommentTime>
            </Flex>
            <Flex>
              <Text style={{ fontWeight: '300' }}>{value.conteudo}</Text>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </SectionFlex>
  )
}

export default IssueComments
