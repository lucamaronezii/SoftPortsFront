import React from 'react'
import { IIssue } from '../../interfaces'
import Typography from 'antd/es/typography/Typography'
import { StyledItem } from './styles'

const ListItem: React.FC<IIssue> = ({ name }) => {
  return (
    <StyledItem>
      <Typography>{name}</Typography>
    </StyledItem>
  )
}

export default ListItem
