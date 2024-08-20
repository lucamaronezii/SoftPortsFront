import { InfoCircleOutlined } from '@ant-design/icons'
import { Flex, Tooltip, Typography, Upload } from 'antd'
import React from 'react'
import GapColumn from '../Column/Column'
import UploadButton from '../UploadButton/UploadButton'
import { ITitleUpload } from './interfaces'

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
                {uploadProps.fileList?.length === 3 ? null : <UploadButton disabled={uploadProps.disabled!}/>}
            </Upload>
        </GapColumn>
    )
}

export default TitleUpload
