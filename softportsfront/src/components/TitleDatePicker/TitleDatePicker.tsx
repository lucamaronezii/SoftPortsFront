import { DatePicker, Typography } from 'antd'
import React from 'react'
import { ITitleDatePicker } from './interfaces'
import GapColumn from '../Column/Column'

const TitleDatePicker: React.FC<ITitleDatePicker> = ({ text, ...pickerProps }) => {
    const { Text } = Typography

    return (
        <GapColumn>
            <Text>{text}</Text>
            <DatePicker
                {...pickerProps}
                format={'DD/MM/YYYY'}
            />
        </GapColumn>
    )
}

export default TitleDatePicker
