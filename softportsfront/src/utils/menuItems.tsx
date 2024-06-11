import { BugFilled, CheckCircleOutlined, MergeOutlined, ScheduleOutlined, TableOutlined } from '@ant-design/icons';
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
    children: [
      {
        label: 'Casos de teste',
        key: 'test',
        icon: <ScheduleOutlined />
      },
      {
        label: 'Matriz de conflitos',
        key: 'matrix',
        icon: <TableOutlined />
      }
    ]
  },
];
