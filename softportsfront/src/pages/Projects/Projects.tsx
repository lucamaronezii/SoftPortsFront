import React, { useState } from 'react'
import { Divider, Menu, type MenuProps } from 'antd';
import { menuItems } from '../../utils/menuItems';

const Projects = () => {
  const [current, setCurrent] = useState<string>('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <div style={{ padding: '20px 0px 0px 20px' }}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuItems} />
      </div>
      <Divider orientation='center' style={{ marginTop: 0 }} />
    </div>
  )
}

export default Projects
