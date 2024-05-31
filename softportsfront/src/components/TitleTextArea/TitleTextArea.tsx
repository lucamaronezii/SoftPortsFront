import { Flex, Input, Typography } from 'antd'
import React from 'react'
import { ITitleTextArea } from './interfaces'

const TitleTextArea: React.FC<ITitleTextArea> = ({ text, ...textAreaProps }) => {
    const { Text } = Typography
    const { TextArea } = Input

    return (
        <Flex vertical gap={10}>
            <Text>{text}</Text>
            <TextArea
                {...textAreaProps}
            />
        </Flex>
    )
}

export default TitleTextArea
