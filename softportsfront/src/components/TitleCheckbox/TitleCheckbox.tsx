import React from 'react'
import GapColumn from '../Column/Column'
import { Checkbox, Typography } from 'antd'
import { ITitleCheckbox } from './interfaces'

const TitleCheckbox: React.FC<ITitleCheckbox> = ({ text, ...checkboxProps }) => {
    const { Text } = Typography

    return (
        <GapColumn>
            <Text>{text}</Text>
            <Checkbox {...checkboxProps}/>
        </GapColumn>
    )
}

export default TitleCheckbox
