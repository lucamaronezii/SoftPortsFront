import { BugFilled, CheckCircleOutlined, MergeOutlined } from '@ant-design/icons';
import { type MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

export const menuItems: MenuItem[] = [
  {
    label: 'Problemas em correção',
    key: 'tofix',
    icon: <BugFilled />,
  },
  {
    label: 'Problemas corrigidos',
    key: 'fixed',
    icon: <CheckCircleOutlined />,
  },
  {
    label: 'Rastreamento',
    key: 'track',
    icon: <MergeOutlined />,
  },
];
