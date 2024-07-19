import { Button, Divider, Flex, Input, Typography } from 'antd'
import { IKanbanColumnProps } from './interfaces'
import { StyledKColumn } from './styles'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import KanbanCard from '../KanbanCard/KanbanCard'

const KanbanColumn: React.FC<IKanbanColumnProps> = ({ column, children, onAddItem, onClick, onRemoveColumn, updateColumn, addIssue, issues }) => {
  const [editMode, setEditMode] = useState<boolean>(false)

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
        isDragging
      >
        <Flex justify='space-between' align='center'>
          <Typography>{column.title}</Typography>
          <Flex align='center' gap={8}>
            <Flex>0</Flex>
            <Button type='primary' danger icon={<DeleteOutlined />} onClick={onRemoveColumn} />
          </Flex>
        </Flex>
        <Divider style={{ marginTop: 0 }} />
        {children}
      </StyledKColumn>
    )
  }

  return (
    <StyledKColumn
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Flex justify='space-between' align='center'>
        {!editMode &&
          <Typography onClick={() => setEditMode(true)}>{column.title}</Typography>
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
        <Flex align='center' gap={8}>
          <Flex>0</Flex>
          <Button
            type='primary'
            danger
            icon={<DeleteOutlined />}
            onClick={onRemoveColumn}
          />
        </Flex>
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      {issues.map((issue) => (
        <KanbanCard issue={issue}/>
      ))}
      <Button
        style={{ position: 'absolute', bottom: 13 }}
        icon={<PlusOutlined />}
        shape='circle'
        onClick={() => addIssue(column.id)}
      />
    </StyledKColumn>
  )
}

export default KanbanColumn
