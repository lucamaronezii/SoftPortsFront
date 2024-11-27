import { FolderFilled, FolderOutlined, LogoutOutlined, PieChartFilled, PieChartOutlined, SettingFilled, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { useKeycloak } from '@react-keycloak/web'
import { Flex } from 'antd'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import logo from '../assets/SoftPortsLogo.png'
import { useAxios } from '../auth/useAxios'
import SidebarItem from '../components/SidebarItem/SidebarItem'
import { ImageBox, LogoBox, LogoText } from '../components/SidebarItem/styles'
import useProjects from '../hooks/useProjects'
import { CustomSidebar } from './styles'
import useRoles from '../hooks/useRoles'

const LeftSidebar = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const { keycloak } = useKeycloak()
  const { projects, setProjects } = useProjects()
  const { isIncluding } = useRoles()
  const axios = useAxios()

  const user = keycloak.tokenParsed

  console.log(user)

  const getProjects = async () => {
    setTimeout(async () => {
      await axios.get('/projeto')
        .then(res => setProjects(res.data.conteudo))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }, 1700)
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <CustomSidebar vertical open={open}>
      <Flex vertical gap={8}>
        <LogoBox>
          <ImageBox>
            <img src={logo} alt="SoftPorts Logo" style={{ width: '100%' }} />
          </ImageBox>
          <LogoText>Softports</LogoText>
        </LogoBox>
        {!isIncluding('DESENVOLVEDOR') &&
          <SidebarItem
            text='Dashboard'
            icFilled={<PieChartFilled />}
            icOutlined={<PieChartOutlined />}
            to='/'
          />
        }
        <SidebarItem
          text='Projetos'
          icFilled={<FolderFilled />}
          icOutlined={<FolderOutlined />}
          to='/projetos'
          hasChild
          projects={projects}
          loadingPjts={loading}
        />
        {!isIncluding('DESENVOLVEDOR') &&
          <SidebarItem
            text='Usuários'
            icFilled={<TeamOutlined />}
            icOutlined={<TeamOutlined />}
            to='/usuarios'
          />
        }
        {/* <SidebarItem
          text='Configurações'
          icFilled={<SettingFilled />}
          icOutlined={<SettingOutlined />}
          to='/config'
        /> */}
      </Flex>
      <Flex vertical gap={8}>
        <SidebarItem
          text={user!.preferred_username}
          icFilled={<UserOutlined />}
          icOutlined={<UserOutlined />}
        />
        <SidebarItem
          text='Logout'
          icFilled={<LogoutOutlined />}
          icOutlined={<LogoutOutlined />}
          onLogout={() => keycloak.logout()}
        />
      </Flex>
    </CustomSidebar>
  )
}

export default LeftSidebar
