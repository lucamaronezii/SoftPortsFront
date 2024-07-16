import React, { useEffect, useState } from 'react'
import { IIssue } from '../../interfaces'
import Typography from 'antd/es/typography/Typography'
import { IdIssue, ListText, StyledChild, StyledItem } from './styles'
import IssueTag from '../../../../components/IssueTag/IssueTag'
import { Avatar } from 'antd'
import { prColor } from '../../../../styles/theme'
import { darkerPr } from '../../../../utils/darkerPrimary'
import { format } from 'date-fns'

const ListItem: React.FC<IIssue> = ({ id, titulo: name, prioridade: priority, responsaveis, status, classificacoes: classification, dataCorrecao: fixDate, onClick }) => {
  const [initials, setInitials] = useState<string[]>([])

  const getUsersInitials = () => {
    const newInitials = responsaveis.map(user => {
      const text = user.nome[0] + user.nome[1]
      return text.toUpperCase()
    })
    setInitials(newInitials)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy')
  }

  useEffect(() => {
    getUsersInitials()
  }, [])

  return (
    <StyledItem onClick={onClick}>
      <StyledChild gap={10} width='35%'>
        <IdIssue>[ID-{id}]</IdIssue>
        <ListText title={name}>{name}</ListText>
      </StyledChild>
      <StyledChild width='10%'>
        <Typography>{status}</Typography>
      </StyledChild>
      <StyledChild width='10%' justify='center'>
        <IssueTag priority={priority}>{priority}</IssueTag>
      </StyledChild>
      <StyledChild width='15%' justify='center'>
        {classification.map((item) => (
          <Typography key={item.classificacaoId}>{item.nome} ‎</Typography>
        ))}
      </StyledChild>
      <StyledChild justify='center'>
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
      <StyledChild width='15%' justify='end'>
        <Typography>{formatDate(fixDate)}</Typography>
      </StyledChild>
    </StyledItem>
  )
}

export default ListItem
