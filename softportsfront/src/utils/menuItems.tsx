import {
  AlertOutlined, BugOutlined, CheckCircleOutlined, MailOutlined,
  MergeOutlined, ScheduleOutlined, SettingOutlined, SlidersOutlined, TableOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { type MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const OpenIssuesMenu: MenuItem[] = [
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
    icon: <SlidersOutlined />,
    children: [
      {
        label: 'Defect Density',
        key: 'defect',
        icon: <AlertOutlined />
      }
    ]
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
];

export const IssueMenu: MenuItem[] = [
  {
    label: 'Detalhes',
    key: 'details',
    style: {
      marginLeft: "-16px",
    }
  },
  {
    label: 'Comentários',
    key: 'comments',
  },
  {
    label: 'Logs',
    key: 'logs',
  },
]