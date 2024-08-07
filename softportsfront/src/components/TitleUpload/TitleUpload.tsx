import React, { useState } from 'react'
import { ITitleUpload } from './interfaces'
import { Flex, Tooltip, Typography, Upload } from 'antd'
import GapColumn from '../Column/Column'
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons'

const TitleUpload: React.FC<ITitleUpload> = ({ text, tooltip, uploadButton, ...uploadProps }) => {
    const { Text } = Typography

    return (
        <GapColumn>
            <Flex align='center' gap={10}>
                <Text>{text}</Text>
                {tooltip &&
                    <Tooltip placement="right" title={tooltip}>
                        <InfoCircleOutlined />
                    </Tooltip>
                }
            </Flex>

            <Upload
                {...uploadProps}
            >
                {uploadButton ??
                    <Flex vertical align='center' gap={10}>
                        <PlusOutlined />
                        <Text>Upload</Text>
                    </Flex>
                }
            </Upload>
        </GapColumn>
    )
}

export default TitleUpload
