import { Button, Flex } from 'antd'
import { prColor } from '../../../../../styles/theme'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Typography from 'antd/es/typography/Typography'
import { DragOutlined } from '@ant-design/icons'
import { StyledKCard } from './styles'
import { IIssue } from '../../../interfaces'

const KanbanCard: React.FC<{ issue: IIssue }> = ({ issue }) => {
    return (
        <StyledKCard>
            <Typography>{issue.titulo}</Typography>
        </StyledKCard>
    )
}

export default KanbanCard
