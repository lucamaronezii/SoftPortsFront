import { BugFilled, CheckCircleOutlined } from '@ant-design/icons';
import { type MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

export const menuItems: MenuItem[] = [
  {
    label: 'Problemas em correção',
    key: 'issues_progress',
    icon: <BugFilled/>,
  },
  {
    label: 'Problemas corrigidos',
    key: 'issues_checked',
    icon: <CheckCircleOutlined />,
  },
];
