import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Typography from 'antd/es/typography/Typography'
import { useEffect, useState } from 'react'
import { getUsersInitials } from '../../../../../utils/getUsersInitials'
import { IKanbanCard } from './interfaces'
import { StyledFlexBox, StyledKCard, StyledTitle } from './styles'
import { Avatar, Flex } from 'antd'
import { darkerPr } from '../../../../../utils/darkerPrimary'
import { prColor } from '../../../../../styles/theme'
import IssueTag from '../../../../../components/IssueTag/IssueTag'
import { getPriority } from '../../../../../utils/getPriority'

const KanbanCard: React.FC<IKanbanCard> = ({ issue, deleteIssue, onView }) => {
    const [initials, setInitials] = useState<string[]>([])
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

    useEffect(() => {
        getUsersInitials(issue.usuarios, setInitials)
    }, [])

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
            <StyledFlexBox onClick={() => onView!(issue)}>
                <StyledTitle
                    ellipsis={{
                        rows: 2,
                        expandable: true,
                        symbol: <span style={{ color: darkerPr }}>Expandir</span>
                    }}
                >{issue.titulo}</StyledTitle>
                <Flex justify='space-between'>
                    <Avatar.Group
                        maxCount={2}
                        maxStyle={{ color: '#FFF', backgroundColor: darkerPr }}>
                        {initials.map((user, index) => (
                            <Avatar
                                key={index}
                                size={'small'}
                                style={{ backgroundColor: prColor, fontSize: 11 }}>
                                {user}</Avatar>
                        ))}
                    </Avatar.Group>
                    <IssueTag priority={issue.prioridade}>{getPriority(issue.prioridade)}</IssueTag>
                </Flex>
            </StyledFlexBox>
        </StyledKCard>
    )
}

export default KanbanCard
