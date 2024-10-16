import { CommentOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Flex, Typography } from 'antd'
import React from 'react'
import { ISubPage } from './interfaces'
import { CommentTime, SectionFlex } from './styles'
import { handleCommentDate } from '../../../../../utils/handleDate'

const IssueComments: React.FC<ISubPage> = ({ issue }) => {
  const { Text } = Typography

  return (
    <SectionFlex>
      {issue.comentarios && issue.comentarios.conteudo.length > 0 ? (
        issue.comentarios.conteudo.map((value, index) => (
          <Flex key={index} gap={12}>
            <Avatar
              icon={<UserOutlined />}
              style={{ minWidth: '31px' }}
            />
            <Flex vertical gap={5}>
              <Flex gap={12}>
                <Text style={{ fontWeight: '500' }}>{value.nome}</Text>
                <CommentTime>{handleCommentDate(value.dataCriacao)}</CommentTime>
              </Flex>
              <Flex>
                <Text style={{ fontWeight: '300' }}>{value.conteudo}</Text>
              </Flex>
            </Flex>
          </Flex>
        ))
      ) : (
        <Flex vertical align='center' gap={12}>
          <CommentOutlined style={{ fontSize: 25 }} />
          <Typography>Nenhum comentário encontrado.</Typography>
        </Flex>
      )}
    </SectionFlex>
  )
}

export default IssueComments
