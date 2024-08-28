import React, { useEffect, useState } from 'react'
import { Divider, Flex, Menu, type MenuProps } from 'antd';
import { OpenIssuesMenu } from '../../utils/menuItems';
import OpenIssues from './OpenIssues/OpenIssues';
import FixedIssues from './ClosedIssues/ClosedIssues';
import Matrix from './Matrix/Matrix';
import TestCases from './TestCases/TestCases';
import DefectDensity from './Metrics/DefectDensity/DefectDensity';
import Requests from './Requests/Requests';
import { SubnavPad } from '../Users/styles';
import useProjects from '../../hooks/useProjects';
import { IUser } from '../Users/interfaces';
import { useAxios } from '../../auth/useAxios';

const Projects = () => {
  const [current, setCurrent] = useState<string>('tofix');
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true)
  const [users, setUsers] = useState<IUser[]>([])
  const { selectedProject } = useProjects()
  const axios = useAxios()

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const renderPage = () => {
    switch (current) {
      case "tofix":
        return <OpenIssues loadingUsers={loadingUsers} users={users} />
      case "fixed":
        return <FixedIssues />
      case "test":
        return <TestCases />
      case "matrix":
        return <Matrix />
      case "defect":
        return <DefectDensity />
      case "requests":
        return <Requests />
    }
  }

  const handleGetUsers = async () => {
    await axios.get(`usuario?projetoId=${selectedProject.id}`)
      .then(res => setUsers(res.data.conteudo))
      .catch(err => console.error(err))
      .finally(() => setTimeout(() => { setLoadingUsers(false) }, 1000))
  }

  useEffect(() => {
    handleGetUsers()
  }, [])

  useEffect(() => {
    setCurrent('tofix')
  }, [selectedProject])

  return (
    <Flex vertical style={{ height: '100vh' }}>
      <SubnavPad>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={OpenIssuesMenu}
        />
      </SubnavPad>
      <Divider
        orientation='center'
        style={{ marginTop: 0 }}
      />
      {renderPage()}
    </Flex>
  )
}

export default Projects
