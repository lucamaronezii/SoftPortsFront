import { Flex, Select, Typography } from 'antd'
import React from 'react'
import { ITitleSelect } from './interfaces'

const TitleSelect: React.FC<ITitleSelect> = ({ text, ...selectProps }) => {
    const { Text } = Typography

    return (
        <Flex vertical gap={10}>
            <Text>{text}</Text>
            <Select
                {...selectProps}
            />
        </Flex>
    )
}

export default TitleSelect
