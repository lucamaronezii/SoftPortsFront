import React, { useState } from 'react'
import { ITitleUpload } from './interfaces'
import { Flex, Typography, Upload } from 'antd'
import GapColumn from '../Column/Column'
import { PlusOutlined } from '@ant-design/icons'

const TitleUpload: React.FC<ITitleUpload> = ({ text, ...uploadProps }) => {
    const { Text } = Typography

    return (
        <GapColumn>
            <Text>{text}</Text>
            <Upload
                {...uploadProps}
            >
                <Flex vertical align='center' gap={10}>
                    <PlusOutlined />
                    <Text>Upload</Text>
                </Flex>
            </Upload>
        </GapColumn>
    )
}

export default TitleUpload
