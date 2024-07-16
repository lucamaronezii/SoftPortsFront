import { Flex } from 'antd'
import React, { ReactNode } from 'react'

const KanbanBox: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Flex
            gap={25}
            style={{
                height: '100%',
                // backgroundColor: 'red'
            }}
        >
            {children}
        </Flex>
    )
}

export default KanbanBox
