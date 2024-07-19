import { Button, Flex } from 'antd'
import { prColor } from '../../../../../styles/theme'
import { useSortable } from '@dnd-kit/sortable'
import { IKanbanCardProps } from './interfaces'
import { CSS } from '@dnd-kit/utilities'
import Typography from 'antd/es/typography/Typography'
import { DragOutlined } from '@ant-design/icons'

const KanbanCard: React.FC<IKanbanCardProps> = ({ id }) => {
    const {
        attributes,
        setNodeRef,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: id!,
        data: {
            type: 'item'
        }
    })

    return (
        <Flex
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                height: '75px',
                width: '160px',
                backgroundColor: prColor,
                transition,
                transform: CSS.Translate.toString(transform)
            }}
        >
            <Typography>Testando dragger</Typography>
            <Button
                type='dashed'
                size='small'
                icon={<DragOutlined />}
                {...listeners}
            >
                Handle me
            </Button>
        </Flex>
    )
}

export default KanbanCard
