import { PlusOutlined } from '@ant-design/icons'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, Divider, Flex, Input } from 'antd'
import { useMemo, useState } from 'react'
import KanbanCard from '../KanbanCard/KanbanCard'
import { IKanbanColumnProps } from './interfaces'
import { ColumnTitle, StyledCardsBox, StyledKColumn } from './styles'

const KanbanColumn: React.FC<IKanbanColumnProps> = ({ column, children, onAddItem, onClick, onRemoveColumn,
  updateColumn, addIssue, issues, deleteIssue, onAdd }) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const issuesId = useMemo(() => {
    return issues.map((issue) => issue.id)
  }, [issues])

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column
    },
    disabled: editMode
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging) {
    return (
      <StyledKColumn
        ref={setNodeRef}
        style={style}
        isDragging
      >
        <Flex justify='space-between' align='center'>
          <></>
        </Flex>
      </StyledKColumn>
    )
  }

  return (
    <StyledKColumn
      ref={setNodeRef}
      style={style}
    >
      <Flex
        justify='space-between'
        align='center'
        {...listeners}
        {...attributes}
        style={{ cursor: 'grab' }}
      >
        {!editMode &&
          <ColumnTitle onClick={() => setEditMode(true)}>{column.title}</ColumnTitle>
        }
        {editMode &&
          <Input
            value={column.title}
            onChange={(e) => updateColumn(column.id, e.target.value)}
            size='small'
            autoFocus
            onBlur={() => setEditMode(false)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              setEditMode(false);
            }}
          />
        }
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      <StyledCardsBox vertical>
        <SortableContext items={issuesId}>
          {issues.map((issue) => (
            <KanbanCard
              key={issue.id}
              issue={issue}
              deleteIssue={deleteIssue}
            />
          ))}
        </SortableContext>
      </StyledCardsBox>
      <Button
        style={{ position: 'absolute', bottom: 13 }}
        icon={<PlusOutlined />}
        shape='circle'
        // onClick={() => addIssue(column.id)}
        onClick={() => onAdd()}
      />
    </StyledKColumn>
  )
}

export default KanbanColumn
