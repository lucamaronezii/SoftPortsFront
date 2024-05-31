import { Flex } from 'antd'
import { FlexProps } from 'antd/lib'
import React from 'react'

const GapColumn: React.FC<FlexProps> = ({ children }) => {
    return (
        <Flex vertical gap={10}>
            {children}
        </Flex>
    )
}

export default GapColumn
