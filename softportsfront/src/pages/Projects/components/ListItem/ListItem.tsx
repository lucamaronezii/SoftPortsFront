import React, { useEffect, useState } from 'react'
import { IIssue } from '../../interfaces'
import Typography from 'antd/es/typography/Typography'
import { IdIssue, ListText, StyledChild, StyledItem } from './styles'
import IssueTag from '../../../../components/IssueTag/IssueTag'
import { Avatar } from 'antd'
import { usersList } from '../../../../mocks/Users'
import { prColor } from '../../../../styles/theme'
import { darkerPr } from '../../../../utils/darkerPrimary'

const ListItem: React.FC<IIssue> = ({ id, name, priority, responsibles, status, classification }) => {
  const [initials, setInitials] = useState<string[]>([])

  const getUsersInitials = () => {
    const newInitials = usersList.map(user => {
      const text = user.name[0] + user.name[1]
      return text.toUpperCase()
    })
    setInitials(newInitials)
  }

  useEffect(() => {
    getUsersInitials()
  }, [])

  return (
    <StyledItem>
      <StyledChild gap={10} width='35%'>
        <IdIssue>[ID-{id}]</IdIssue>
        <ListText title={name}>{name}</ListText>
      </StyledChild>
      <StyledChild>
        <Typography>{status}</Typography>
      </StyledChild>
      <StyledChild width='10%' justify='center'>
        <IssueTag priority={priority}>{priority}</IssueTag>
      </StyledChild>
      <StyledChild width='15%' justify='center'>
        <Typography>{classification}</Typography>
      </StyledChild>
      <StyledChild justify='end'>
        <Avatar.Group
          maxCount={2}
          maxStyle={{ color: '#FFF', backgroundColor: darkerPr }}
        >
          {initials.map((user, index) => (
            <Avatar
              size={'default'}
              style={{ backgroundColor: prColor }}
            >
              {user}
            </Avatar>
          ))}
        </Avatar.Group>
      </StyledChild>
    </StyledItem>
  )
}

export default ListItem
