import React from 'react'
import LeftSidebar from './LeftSidebar'
import { Outlet } from 'react-router-dom'
import { Flex } from 'antd'
import { CustomBox } from './styles'

const MainLayout = () => {
    return (
        <Flex>
            <LeftSidebar />
            <div style={{ flexGrow: 1 }}>
                <CustomBox>
                    <Outlet />
                </CustomBox>
            </div>
        </Flex>
    )
}

export default MainLayout
