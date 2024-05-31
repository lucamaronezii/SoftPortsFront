import { DatePicker, Flex, Typography } from 'antd'
import React from 'react'
import { ITitleDatePicker } from './interfaces'

const TitleDatePicker: React.FC<ITitleDatePicker> = ({ text, ...pickerProps }) => {
    const { Text } = Typography

    return (
        <Flex vertical gap={10}>
            <Text>{text}</Text>
            <DatePicker
                {...pickerProps}
                format={'DD/MM/YYYY'}
            />
        </Flex>
    )
}

export default TitleDatePicker
