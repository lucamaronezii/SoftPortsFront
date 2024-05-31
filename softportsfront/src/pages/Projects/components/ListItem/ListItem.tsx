import React from 'react'
import { IIssue } from '../../interfaces'
import Typography from 'antd/es/typography/Typography'
import { ListText, StyledChild, StyledItem } from './styles'
import IssueTag from '../../../../components/IssueTag/IssueTag'

const ListItem: React.FC<IIssue> = ({ name, priority, responsibles, status, classification }) => {
  return (
    <StyledItem>
      <StyledChild width='35%'>
        <ListText title={name}>{name}</ListText>
      </StyledChild>
      <StyledChild>
        <Typography>{status}</Typography>
      </StyledChild>
      <StyledChild width='10%'>
        <IssueTag priority={priority}>{priority}</IssueTag>
      </StyledChild>
      <StyledChild width='15%'>
        <Typography>{classification}</Typography>
      </StyledChild>
      <StyledChild justify='end'>
        <Typography>{responsibles}</Typography>
      </StyledChild>
    </StyledItem>
  )
}

export default ListItem
