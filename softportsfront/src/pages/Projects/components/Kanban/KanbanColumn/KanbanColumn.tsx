import { Button, Divider, Flex, Typography } from 'antd'
import { IKanbanColumnProps } from './interfaces'
import { StyledKanban } from './styles'
import { DragOutlined, PlusOutlined } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const KanbanColumn: React.FC<IKanbanColumnProps> = ({ id, title, children, onAddItem, onClick }) => {
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
      type: 'container'
    }
  })

  return (
    <StyledKanban
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform)
      }}
    >
      <Flex justify='space-between' align='center'>
        <Typography>{title}</Typography>
        <Button
          shape='circle'
          type='primary'
          size='small'
          icon={<PlusOutlined />}
          onClick={onClick}
        />
        <Button
          type='dashed'
          size='small'
          icon={<DragOutlined />}
          onClick={onClick}
          {...listeners}
        >
          Handle me
        </Button>
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      {children}
    </StyledKanban>
  )
}

export default KanbanColumn
