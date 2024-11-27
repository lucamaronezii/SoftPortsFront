import { DownOutlined, InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Flex, Select, Tooltip, Typography } from 'antd'
import React from 'react'
import GapColumn from '../Column/Column'
import { ITitleSelect } from './interfaces'

const TitleSelect: React.FC<ITitleSelect> = ({ text, removeIcon, tooltip, ...selectProps }) => {
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
            <Select
                {...selectProps}
                suffixIcon={removeIcon ? '' : <DownOutlined />}
            />
        </GapColumn>
    )
}

export default TitleSelect
