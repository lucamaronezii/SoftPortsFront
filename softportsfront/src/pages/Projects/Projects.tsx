import { useState } from 'react'
import { Divider, Menu, type MenuProps } from 'antd';
import { menuItems } from '../../utils/menuItems';
import OpenIssues from './OpenIssues/OpenIssues';
import FixedIssues from './ClosedIssues/ClosedIssues';
import Matrix from './Matrix/Matrix';
import TestCases from './TestCases/TestCases';
import DefectDensity from './Metrics/DefectDensity/DefectDensity';
import Requests from './Requests/Requests';

const Projects = () => {
  const [current, setCurrent] = useState<string>('tofix');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const renderPage = () => {
    switch (current) {
      case "tofix":
        return <OpenIssues />
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

  return (
    <div>
      <div style={{ padding: '20px 0px 0px 20px' }}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={menuItems}
        />
      </div>
      <Divider
        orientation='center'
        style={{ marginTop: 0 }}
      />
      {renderPage()}
    </div>
  )
}

export default Projects
