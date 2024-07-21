import Typography from 'antd/es/typography/Typography'
import { StyledKCard } from './styles'
import { useState } from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { IKanbanCard } from './interfaces'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const KanbanCard: React.FC<IKanbanCard> = ({ issue, deleteIssue }) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: issue.id,
        data: {
            type: "IIssue",
            issue
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <StyledKCard
                ref={setNodeRef}
                style={style}
                isDragging
            />
            
        )
    }

    return (
        <StyledKCard
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <Typography>{issue.titulo}</Typography>
            <Button
                shape='circle'
                danger
                icon={<DeleteOutlined />}
                style={{ position: 'absolute', right: 10, bottom: 21 }}
                onClick={() => deleteIssue(issue.id)}
            />
        </StyledKCard>
    )
}

export default KanbanCard
