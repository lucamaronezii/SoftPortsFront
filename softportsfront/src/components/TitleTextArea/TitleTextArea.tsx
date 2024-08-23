import { Input, Typography } from 'antd'
import React from 'react'
import { ITitleTextArea } from './interfaces'
import GapColumn from '../Column/Column'
import { errColor } from '../../styles/theme'

const TitleTextArea: React.FC<ITitleTextArea> = ({ text, error, ...textAreaProps }) => {
    const { Text } = Typography
    const { TextArea } = Input

    return (
        <GapColumn>
            <Text>{text}</Text>
            <TextArea
                style={{ borderColor: error ? errColor : undefined }}
                {...textAreaProps}
            />
        </GapColumn>
    )
}

export default TitleTextArea
