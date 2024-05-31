import { Flex, Input, Typography } from 'antd'
import React from 'react'
import { ITitleInput } from './interfaces'

const TitleInput: React.FC<ITitleInput> = ({ text, ...inputProps }) => {
    const { Text } = Typography

    return (
        <Flex vertical gap={10}>
            <Text>{text}</Text>
            {inputProps.type == "password" ? (
                <Input.Password
                    {...inputProps}
                />
            ) : (
                <Input
                    {...inputProps}
                />
            )}
        </Flex>
    )
}

export default TitleInput
