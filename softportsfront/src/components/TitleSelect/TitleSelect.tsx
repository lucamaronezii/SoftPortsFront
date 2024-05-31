import { Select, Typography } from 'antd'
import React from 'react'
import { ITitleSelect } from './interfaces'
import GapColumn from '../Column/Column'

const TitleSelect: React.FC<ITitleSelect> = ({ text, ...selectProps }) => {
    const { Text } = Typography

    return (
        <GapColumn>
            <Text>{text}</Text>
            <Select
                {...selectProps}
            />
        </GapColumn>
    )
}

export default TitleSelect
