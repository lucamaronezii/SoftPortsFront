import { useState } from 'react'
import { Divider, Menu, type MenuProps } from 'antd';
import { menuItems } from '../../utils/menuItems';
import ToFixIssues from './ToFixIssues/ToFixIssues';
import FixedIssues from './FIxedIssues/FixedIssues';
import Tracking from './Tracking/Tracking';

const Projects = () => {
  const [current, setCurrent] = useState<string>('tofix');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    sessionStorage.setItem('teste', e.key)
  };

  const renderPage = () => {
    switch (current) {
      case "tofix":
        return <ToFixIssues />
      case "fixed":
        return <FixedIssues />
      case "track":
        return <Tracking />
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
      <Divider orientation='center' style={{ marginTop: 0 }} />
      {renderPage()}
    </div>
  )
}

export default Projects
