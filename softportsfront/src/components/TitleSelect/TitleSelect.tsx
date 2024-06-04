import { Select, Typography } from 'antd'
import React from 'react'
import { ITitleSelect } from './interfaces'
import GapColumn from '../Column/Column'
import { DownOutlined } from '@ant-design/icons'

const TitleSelect: React.FC<ITitleSelect> = ({ text, removeIcon, ...selectProps }) => {
    const { Text } = Typography

    return (
        <GapColumn>
            <Text>{text}</Text>
            <Select
                {...selectProps}
                suffixIcon={removeIcon ? '' : <DownOutlined />}
            />
        </GapColumn>
    )
}

export default TitleSelect
