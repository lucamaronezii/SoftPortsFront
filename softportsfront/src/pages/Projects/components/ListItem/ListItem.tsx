import { Avatar } from 'antd'
import Typography from 'antd/es/typography/Typography'
import React, { useEffect, useState } from 'react'
import IssueTag from '../../../../components/IssueTag/IssueTag'
import { prColor } from '../../../../styles/theme'
import { darkerPr } from '../../../../utils/darkerPrimary'
import { getPriority } from '../../../../utils/getPriority'
import { getStatus } from '../../../../utils/getStatus'
import { IClassResponse, IIssue } from '../../interfaces'
import { IdIssue, ListText, StyledChild, StyledItem } from './styles'
import { formatDate } from '../../../../utils/formatDate'
import { mapClass } from '../../../../utils/mapClass'

const ListItem: React.FC<IIssue> = ({ id, titulo, prioridade, usuarios, status, classificacoes, dataEstimada, onClick }) => {
  const [initials, setInitials] = useState<string[]>([])

  const getUsersInitials = () => {
    const newInitials = usuarios.map(user => {
      const text = user.nome[0] + user.nome[1]
      return text.toUpperCase()
    })
    setInitials(newInitials)
  }

  useEffect(() => {
    getUsersInitials()
  }, [])

  return (
    <StyledItem onClick={onClick}>
      <StyledChild gap={10} width='35%'>
        <IdIssue>[ID-{id}]</IdIssue>
        <ListText title={titulo}>{titulo}</ListText>
      </StyledChild>
      <StyledChild width='10%'>
        <Typography>{getStatus(status)}</Typography>
      </StyledChild>
      <StyledChild width='10%' justify='center'>
        <IssueTag priority={1}>{getPriority(1)}</IssueTag>
      </StyledChild>
      <StyledChild width='15%' justify='center'>
        <Typography>{mapClass(classificacoes!)}‎</Typography>
      </StyledChild>
      <StyledChild justify='center'>
        <Avatar.Group
          maxCount={2}
          maxStyle={{ color: '#FFF', backgroundColor: darkerPr }}
        >
          {initials.map((user, index) => (
            <Avatar
              key={index}
              size={'default'}
              style={{ backgroundColor: prColor }}
            >
              {user}
            </Avatar>
          ))}
        </Avatar.Group>
      </StyledChild>
      <StyledChild width='15%' justify='end'>
        <Typography>{formatDate(dataEstimada)}</Typography>
      </StyledChild>
    </StyledItem>
  )
}

export default ListItem
