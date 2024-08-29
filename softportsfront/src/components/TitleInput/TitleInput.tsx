import { Input, Typography } from 'antd'
import React from 'react'
import { ITitleInput } from './interfaces'
import GapColumn from '../Column/Column'
import { errColor } from '../../styles/theme'

const TitleInput: React.FC<ITitleInput> = ({ text, error, ...inputProps }) => {
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
                    style={{ borderColor: error ? errColor : undefined}}
                    {...inputProps}
                />
            )}
        </GapColumn>
    )
}

export default TitleInput
