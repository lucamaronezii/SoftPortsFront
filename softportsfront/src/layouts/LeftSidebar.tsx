import { useState } from 'react'
import { Flex } from 'antd'
import { CustomSidebar } from './styles'
import SidebarItem from '../components/SidebarItem/SidebarItem'
import { FolderFilled, FolderOutlined, LogoutOutlined, PieChartFilled, PieChartOutlined, SettingFilled, SettingOutlined, UserOutlined } from '@ant-design/icons'
import logo from '../assets/SoftPortsLogo.png'
import { ImageBox, LogoBox, LogoText } from '../components/SidebarItem/styles'
import { useKeycloak } from '@react-keycloak/web'

const LeftSidebar = () => {
  const [open, setOpen] = useState<boolean>(true)
  const { keycloak } = useKeycloak()

  return (
    <CustomSidebar vertical open={open}>
      <Flex vertical gap={8}>
        <LogoBox>
          <ImageBox>
            <img src={logo} alt="SoftPorts Logo" style={{ width: '100%' }} />
          </ImageBox>
          <LogoText>Softports</LogoText>
        </LogoBox>
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
        onLogout={() => keycloak.logout()}
      />
    </CustomSidebar>
  )
}

export default LeftSidebar
