import { UserOutlined } from '@ant-design/icons'
import { Avatar, Flex, Typography } from 'antd'
import React, { useState } from 'react'
import { CommentTime, SectionFlex } from './styles'
import { IIssue, IIssueComment } from '../../../interfaces'
import { issuesListTest } from '../../../../../mocks/Issues'
import { ISubPage } from './interfaces'

const IssueComments: React.FC<ISubPage> = ({ issue }) => {
  const { Text } = Typography
  const [comments, setComments] = useState<IIssueComment[]>(issuesListTest[0].comentarios || [])

  return (
    <SectionFlex>
      {comments.map((value) => (
        <Flex gap={12}>
          <Avatar
            icon={<UserOutlined />}
            style={{ minWidth: '31px' }}
          />
          <Flex vertical gap={5}>
            <Flex gap={12}>
              <Text style={{ fontWeight: '500' }}>{value.username}</Text>
              <CommentTime>{value.time}</CommentTime>
            </Flex>
            <Flex>
              <Text style={{ fontWeight: '300' }}>{value.description}</Text>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </SectionFlex>
  )
}

export default IssueComments
