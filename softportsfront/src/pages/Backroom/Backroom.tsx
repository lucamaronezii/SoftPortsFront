import React from 'react'
import { StyledBackroom } from './styles'
import { Spin } from 'antd'

const Backroom = () => {
    return (
        <StyledBackroom>
            <Spin size='large'/>
        </StyledBackroom>
    )
}

export default Backroom
