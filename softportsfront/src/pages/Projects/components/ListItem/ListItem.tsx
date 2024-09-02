import { Avatar } from 'antd'
import Typography from 'antd/es/typography/Typography'
import React, { useEffect, useState } from 'react'
import IssueTag from '../../../../components/IssueTag/IssueTag'
import { prColor } from '../../../../styles/theme'
import { darkerPr } from '../../../../utils/darkerPrimary'
import { formatDate } from '../../../../utils/formatDate'
import { getPriority } from '../../../../utils/getPriority'
import { getStatus } from '../../../../utils/getStatus'
import { IIssue } from '../../interfaces'
import { IdIssue, ListText, StyledChild, StyledItem } from './styles'
import { getClass } from '../../../../utils/getClass'
import { getUsersInitials } from '../../../../utils/getUsersInitials'

const ListItem: React.FC<IIssue> = ({ id, titulo, prioridade, usuarios, status, classificacao, dataEstimada, onClick }) => {
  const [initials, setInitials] = useState<string[]>([])

  useEffect(() => {
    getUsersInitials(usuarios, setInitials)
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
        <IssueTag priority={prioridade}>{getPriority(prioridade)}</IssueTag>
      </StyledChild>
      <StyledChild width='15%' justify='center'>
        <Typography>{getClass(classificacao?.id!)} / {getClass(classificacao?.subclassificacaoId!)}</Typography>
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
              style={{ backgroundColor: prColor }}>
              {user}</Avatar>
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
