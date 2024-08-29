import { PlusOutlined } from '@ant-design/icons'
import { Flex, Typography } from 'antd'
import { plcColor } from '../../styles/theme'

const UploadButton: React.FC<{ disabled: boolean }> = ({ disabled }) => {
    return (
        <Flex vertical align='center' gap={10}>
            <PlusOutlined />
            <Typography.Text
                style={{ color: disabled ? plcColor : "#fff" }}
            >Upload</Typography.Text>
        </Flex>
    )
}

export default UploadButton
