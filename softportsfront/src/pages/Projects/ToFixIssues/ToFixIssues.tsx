import { Button, Cascader, Flex, Input, Segmented, message } from 'antd'
import { CustomBox } from './styles'
import { cascaderItems } from '../../../utils/cascaderItems'
import { segItems } from '../../../utils/segItems'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { issuesList } from '../../../mocks/Issues'
import { CustomRow } from '../../../components/CustomRow/styles'
import ListItem from '../components/ListItem/ListItem'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { secBgColor } from '../../../styles/theme'
import { IIssue } from '../interfaces'
import NewIssue from '../components/NewIssue/NewIssue'
import IssueView from '../components/IssueView/IssueView'

const SortableIssue = ({ issue }: any) => {
  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({ id: issue.id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    cursor: 'grab'
  }

  return (
    <div
      key={issue.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
        backgroundColor: secBgColor,
        padding: '15px',
        borderRadius: '6px'
      }}
    >
      {issue.label}
    </div>
  )
}

const ToFixIssues = () => {
  const [issues, setIssues] = useState<IIssue[]>(issuesList)
  const [input, setInput] = useState<string>('')
  const [seg, setSeg] = useState<number>(0)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false)
  const [openIssue, setOpenIssue] = useState<boolean>(false)
  const [issueId, setIssueId] = useState<number>(0)

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Problema registrado com sucesso.',
    });
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id === over.id) {
      return;
    }

    setIssues((issues) => {
      const oldIndex = issues.findIndex((issue) => issue.id == active.id);
      const newIndex = issues.findIndex((issue) => issue.id == over.id)
      return arrayMove(issues, oldIndex, newIndex)
    })
  }

  const handleIssueView = (id: number) => {
    setOpenIssue(true)
    setIssueId(id)
  }

  return (
    <CustomBox>
      {contextHolder}
      <CustomRow>
        <Flex gap={15}>
          <div style={{ maxWidth: '300px' }}>
            <Input.Search
              value={input}
              allowClear
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Cascader
            removeIcon
            multiple
            options={cascaderItems}
            maxTagCount={'responsive'}
          />
          <Segmented
            options={segItems}
            value={seg}
            onChange={(e) => setSeg(e)}
          />
        </Flex>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          iconPosition='end'
          onClick={() => setOpenModal(true)}
        >
          Novo problema
        </Button>
      </CustomRow>

      {seg ? (
        <Flex vertical gap={10}>
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={issues} strategy={verticalListSortingStrategy}>
              {issues.map((issue) => (
                <SortableIssue key={issue.id} issue={issue} />
              ))}
            </SortableContext>
          </DndContext>
        </Flex>
      ) : (
        <>
          {issues.map((issue, index) => (
            <ListItem
              key={index}
              id={issue.id}
              name={issue.name}
              classification={issue.classification}
              description={issue.description}
              priority={issue.priority}
              status={issue.status}
              responsibles={issue.responsibles}
              fixDate={issue.fixDate}
              onClick={() => handleIssueView(issue.id)}
            />
          ))}
        </>
      )}

      <NewIssue open={openModal} onClose={() => setOpenModal(false)} onOk={() => { success(); setOpenModal(false) }} loading={loading} />
      <IssueView open={openIssue} onClose={() => setOpenIssue(false)} issueId={issueId} />
    </CustomBox>
  )
}

export default ToFixIssues
