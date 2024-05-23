import { useState } from 'react'
import { Flex } from 'antd'
import { CustomSidebar } from './styles'
import SidebarItem from '../components/SidebarItem/SidebarItem'
import { FolderFilled, FolderOutlined, LogoutOutlined, PieChartFilled, PieChartOutlined, SettingFilled, SettingOutlined, UserOutlined } from '@ant-design/icons'

const LeftSidebar = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] = useState<string>('')

  const handleItemClick = (to: string) => {
    setSelectedItem(to)
  }

  return (
    <CustomSidebar vertical open={open}>
      <Flex vertical gap={8}>
        <SidebarItem
          text='Dashboard'
          icFilled={<PieChartFilled />}
          icOutlined={<PieChartOutlined />}
          to='/'
        />
        <SidebarItem
          text='Projetos'
          icFilled={<FolderFilled />}
          icOutlined={<FolderOutlined />}
          to='/projetos'
          hasChild
        />
        <SidebarItem
          text='Usuários'
          icFilled={<UserOutlined />}
          icOutlined={<UserOutlined />}
          to='/usuarios'
        />
        <SidebarItem
          text='Configurações'
          icFilled={<SettingFilled />}
          icOutlined={<SettingOutlined />}
          to='/config'
        />
      </Flex>
      <SidebarItem
        text='Logout'
        icFilled={<LogoutOutlined />}
        icOutlined={<LogoutOutlined />}
        to='/login'
      />
    </CustomSidebar>
  )
}

export default LeftSidebar
