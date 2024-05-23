import React from 'react'
import LeftSidebar from './LeftSidebar'
import { Outlet } from 'react-router-dom'
import { Button, Flex } from 'antd'

const MainLayout = () => {
    return (
        <Flex>
            <LeftSidebar />
            <div style={{ flexGrow: 1 }}>
                <Outlet />
            </div>
        </Flex>
    )
}

export default MainLayout
