import React, { cloneElement } from 'react'
import { StyledSidebarItem, StyledText } from './styles'
import { ISidebarItemProps } from './interfaces'
import { prColor } from '../../styles/theme'
import { useNavigate } from 'react-router-dom'

const SidebarItem: React.FC<ISidebarItemProps> = ({ text, to, icFilled, icOutlined }) => {
    const navigate = useNavigate()
    const selIcon = cloneElement(icFilled as React.ReactElement, { style: { color: prColor } })
    const unsIcon = cloneElement(icOutlined as React.ReactElement, { style: { color: '#FFF' } })
    const location = window.location.pathname
    console.log(location)
    return (
        <StyledSidebarItem onClick={() => navigate(to)}>
            {location == to ? selIcon : unsIcon}
            <StyledText>{text}</StyledText>
        </StyledSidebarItem>
    )
}

export default SidebarItem
