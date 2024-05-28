import React from 'react'
import { IIssue, IStyledItem } from '../../interfaces'
import Typography from 'antd/es/typography/Typography'
import { StyledItem } from './styles'

const ListItem: React.FC<IStyledItem> = ({ name, styled }) => {
  return (
    <StyledItem style={styled}>
      <Typography>{name}</Typography>
    </StyledItem>
  )
}

export default ListItem
