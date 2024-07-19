import { Input, Typography } from 'antd'
import React from 'react'
import { ITitleInput } from './interfaces'
import GapColumn from '../Column/Column'

const TitleInput: React.FC<ITitleInput> = ({ text, ...inputProps }) => {
    const { Text } = Typography

    return (
        <GapColumn>
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
        </GapColumn>
    )
}

export default TitleInput
