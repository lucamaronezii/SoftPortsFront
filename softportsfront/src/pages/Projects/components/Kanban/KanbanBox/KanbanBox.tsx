import React, { ReactNode } from 'react'
import { StyledInnerBox, StyledKBox } from './styles'

const KanbanBox: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <StyledKBox>
            <StyledInnerBox>
                {children}
            </StyledInnerBox>
        </StyledKBox>
    )
}

export default KanbanBox
