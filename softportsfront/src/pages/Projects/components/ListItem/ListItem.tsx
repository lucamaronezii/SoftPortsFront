import React from 'react'
import { IIssue, IStyledItem } from '../../interfaces'
import Typography from 'antd/es/typography/Typography'
import { StyledChild, StyledItem } from './styles'

const ListItem: React.FC<IIssue> = ({ name, priority, responsibles, status, classification }) => {
  return (
    <StyledItem>
      <StyledChild width='35%'>
        <Typography>{name}</Typography>
      </StyledChild>
      <StyledChild>
        <Typography>{status}</Typography>
      </StyledChild>
      <StyledChild width='10%'>
        <Typography>{priority}</Typography>
      </StyledChild>
      <StyledChild width='15%'>
        <Typography>{classification}</Typography>
      </StyledChild>
      <StyledChild style={{ justifyContent: 'end' }}>
        <Typography>{responsibles}</Typography>
      </StyledChild>
    </StyledItem>
  )
}

export default ListItem
