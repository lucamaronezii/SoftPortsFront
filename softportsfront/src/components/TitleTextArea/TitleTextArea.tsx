import { Input, Typography } from 'antd'
import React from 'react'
import { ITitleTextArea } from './interfaces'
import GapColumn from '../Column/Column'

const TitleTextArea: React.FC<ITitleTextArea> = ({ text, ...textAreaProps }) => {
    const { Text } = Typography
    const { TextArea } = Input

    return (
        <GapColumn>
            <Text>{text}</Text>
            <TextArea
                {...textAreaProps}
            />
        </GapColumn>
    )
}

export default TitleTextArea
