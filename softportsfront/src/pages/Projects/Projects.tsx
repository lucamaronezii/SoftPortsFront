import React, { useEffect, useState } from 'react'
import { Divider, Flex, Menu, Typography, type MenuProps } from 'antd';
import OpenIssues from './OpenIssues/OpenIssues';
import FixedIssues from './ClosedIssues/ClosedIssues';
import Matrix from './Matrix/Matrix';
import TestCases from './TestCases/TestCases';
import Metrics from './Metrics/Metrics';
import Requests from './Requests/Requests';
import { SubnavPad } from '../Users/styles';
import useProjects from '../../hooks/useProjects';
import { IUser } from '../Users/interfaces';
import { useAxios } from '../../auth/useAxios';
import ProjectConfig from './ProjectConfig/ProjectConfig';
import {
  AlertOutlined, BugOutlined, CheckCircleOutlined, MailOutlined,
  MergeOutlined, ScheduleOutlined, SettingOutlined, SlidersOutlined, TableOutlined,
  WarningOutlined
} from '@ant-design/icons';
import useRoles from '../../hooks/useRoles';
import svg from '../../svg/scrum.svg';

type MenuItem = Required<MenuProps>['items'][number];

const Projects = () => {
  const [current, setCurrent] = useState<string>('tofix');
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true)
  const [users, setUsers] = useState<IUser[]>([])
  const { selectedProject } = useProjects()
  const axios = useAxios()
  const { isIncluding } = useRoles()

  const OpenIssuesMenu: MenuItem[] = [
    ...!isIncluding('DESENVOLVEDOR') ?
      [
        {
          label: 'Ocorrências abertas',
          key: 'tofix',
          icon: <WarningOutlined />,
        },
        {
          label: 'Ocorrências fechadas',
          key: 'fixed',
          icon: <CheckCircleOutlined />,
        },
        {
          label: 'Matriz de conflitos',
          key: 'matrix',
          icon: <TableOutlined />
        },
        {
          label: 'Métricas',
          key: 'metric',
          icon: <SlidersOutlined />
        },
        {
          label: 'Solicitações',
          key: 'requests',
          icon: <MailOutlined />,
        },
        {
          label: 'Configurações',
          key: 'config',
          icon: <SettingOutlined />,
        },
      ] : [
        {
          label: 'Ocorrências abertas',
          key: 'tofix',
          icon: <WarningOutlined />,
        },
      ],
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const renderPage = () => {
    switch (current) {
      case "tofix":
        return <OpenIssues loadingUsers={loadingUsers} users={users} />
      case "fixed":
        return <FixedIssues loadingUsers={loadingUsers} users={users} />
      case "test":
        return <TestCases />
      case "matrix":
        return <Matrix loadingUsers={loadingUsers} users={users} />
      case "metric":
        return <Metrics />
      case "requests":
        return <Requests />
      case "config":
        return <ProjectConfig loadingUsers={loadingUsers} users={users} updated={handleGetUsers} />
    }
  }

  const handleGetUsers = async () => {
    setLoadingUsers(true)
    await axios.get(`usuario?projetoId=${selectedProject.id}`)
      .then(res => setUsers(res.data.conteudo))
      .catch(err => console.error(err))
      .finally(() => setLoadingUsers(false))
  }

  useEffect(() => {
    setCurrent('tofix')
    handleGetUsers()
  }, [selectedProject.id])

  return (
    <Flex vertical style={{ height: '100vh' }}>
      {selectedProject.id > 0 ? (
        <>
          <SubnavPad>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={OpenIssuesMenu}
              style={{ width: '100%' }}
            />
          </SubnavPad>
          <Divider
            orientation='center'
            style={{ marginTop: 0 }}
          />
          {renderPage()}
        </>
      ) : (
        <Flex vertical gap={4} align='center' justify='center' style={{ minHeight: '100vh' }}>
          <img src={svg} width={500}/>
          <Typography.Title>Projetos</Typography.Title>
          <Typography.Text>Selecione um projeto no menu lateral esquerdo para visualizar ocorrências</Typography.Text>
        </Flex>
      )}
    </Flex>
  )
}

export default Projects
