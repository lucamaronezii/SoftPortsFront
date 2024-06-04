import { BugFilled, CheckCircleOutlined, MergeOutlined } from '@ant-design/icons';
import { type MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

export const menuItems: MenuItem[] = [
  {
    label: 'Problemas abertos',
    key: 'tofix',
    icon: <BugFilled />,
  },
  {
    label: 'Problemas fechados',
    key: 'fixed',
    icon: <CheckCircleOutlined />,
  },
  {
    label: 'Rastreamento',
    key: 'track',
    icon: <MergeOutlined />,
  },
];
