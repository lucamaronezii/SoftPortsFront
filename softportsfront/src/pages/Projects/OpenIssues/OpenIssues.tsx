import { Button, Cascader, Flex, Input, Segmented, Skeleton, Spin, Typography, message } from 'antd'
import { NoIssuesBox } from './styles'
import { issueFilterItems } from '../../../utils/issueFilterItems'
import { segItems } from '../../../utils/segItems'
import { BugFilled, PlusCircleFilled, PlusOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { CustomRow } from '../../../components/CustomRow/styles'
import ListItem from '../components/ListItem/ListItem'
import { IIssue } from '../interfaces'
import NewIssue from '../components/NewIssue/NewIssue'
import IssueView from '../components/IssueView/IssueView'
import { getIssues } from '../../../services/IssueServices'
import { NoticeType } from 'antd/es/message/interface'
import { CustomBox } from '../styles'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import KanbanBox from '../components/Kanban/KanbanBox/KanbanBox'
import KanbanColumn from '../components/Kanban/KanbanColumn/KanbanColumn'
import KanbanCard from '../components/Kanban/KanbanCard/KanbanCard'
import { createPortal } from 'react-dom'
import { Column, Id } from '../components/Kanban/KanbanColumn/types'

const OpenIssues = () => {
  const [issues, setIssues] = useState<IIssue[]>([])
  const [input, setInput] = useState<string>('')
  const [seg, setSeg] = useState<number>(1)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(true)
  const [openIssue, setOpenIssue] = useState<boolean>(false)
  const [issueId, setIssueId] = useState<IIssue>()
  const [testIssues, setTestIssues] = useState<IIssue[]>([])

  const handleIssueView = (issue: IIssue) => {
    setOpenIssue(true)
    setIssueId(issue)
  }

  const handleMessage = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const handleOkButton = (status?: string | undefined) => {
    if (status == "close" || !status) {
      // pass
    } else if (status == "success") {
      handleMessage('success', 'Problema aberto com sucesso.')
      handleGetIssues()
    } else if (status == "deleted") {
      handleMessage('success', 'Problema excluído com sucesso.')
      handleGetIssues()
    } else if (status == "updated") {
      handleMessage('success', 'Problema atualizado com sucesso.')
      handleGetIssues()
    }
    setOpenModal(false)
    setOpenIssue(false)
  }

  const handleGetIssues = async () => {
    try {
      setLoading(true)
      await getIssues().then((response) => setIssues(response.data.conteudo))
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }

  useEffect(() => {
    handleGetIssues()
  }, [])

  const [columns, setColumns] = useState<Column[]>([])

  const generateId = () => {
    return Math.floor(Math.random() * 10001)
  }

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`
    }

    setColumns([...columns, columnToAdd])
  }

  const deleteColumn = (id: Id) => {
    setColumns(columns.filter(column => column.id !== id))
    setTestIssues(testIssues.filter(issue => issue.columnId !== id))
  }

  const columnsId = useMemo(() => columns.map(col => col.id), [columns])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeIssue, setActiveIssue] = useState<IIssue | null>(null)

  const onDragStart = (event: DragStartEvent) => {
    console.log("DRAGGING START", event)

    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column)
      return;
    }

    if (event.active.data.current?.type === "IIssue") {
      setActiveIssue(event.active.data.current.issue)
      return;
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveColumn(null);
      setActiveIssue(null);
      return;
    }

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (active.data.current?.type === "Column" && activeColumnId !== overColumnId) {
      setColumns(columns => {
        const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);
        const overColumnIndex = columns.findIndex(col => col.id === overColumnId);
        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    }

    setActiveColumn(null);
    setActiveIssue(null);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveIssue = active.data.current?.type == "IIssue"
    const isOverIssue = over.data.current?.type == "IIssue"

    if (!isActiveIssue) return

    if (isActiveIssue && isOverIssue) {
      setTestIssues(testIssues => {
        const activeIndex = testIssues.findIndex(t => t.id == activeId)
        const overIndex = testIssues.findIndex(t => t.id == overId)

        testIssues[activeIndex].columnId = testIssues[overIndex].columnId

        return arrayMove(testIssues, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === "Column"

    if (isActiveIssue && isOverAColumn) {
      const activeIndex = testIssues.findIndex(t => t.id == activeId)

      testIssues[activeIndex].columnId = overId

      return arrayMove(testIssues, activeIndex, activeIndex)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  const updateColumn = (id: Id, text: string) => {
    const newColumns = columns.map(col => {
      if (col.id !== id) return col
      return { ...col, text }
    })

    setColumns(newColumns)
  }

  const addIssue = (columnId: Id) => {
    const newIssue: IIssue = {
      id: generateId(),
      classificacoes: [],
      dataCorrecao: '',
      descricao: '',
      prioridade: 'Crítica',
      responsaveis: [],
      status: '',
      titulo: `Issue ${testIssues.length + 1}`,
      caminho: '',
      casosDeTestes: [],
      screenshot: '',
      versaoSO: '',
      columnId: columnId
    }

    setTestIssues([...testIssues, newIssue])
  }

  const deleteIssue = (id: Id) => {
    const newIssues = testIssues.filter(issue => issue.id !== id)
    console.log(id)
    console.log(newIssues)
    setTestIssues(newIssues)
  }

  return (
    <CustomBox>
      {contextHolder}
      <CustomRow>
        <Flex gap={15}>
          <div style={{ maxWidth: '300px' }}>
            <Input.Search
              value={input}
              placeholder='Pesquisar registro'
              allowClear
              enterButton
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Cascader
            removeIcon
            placeholder='Filtrar registros'
            multiple
            options={issueFilterItems}
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
        <KanbanBox>
          <Flex vertical gap={4}>
            <Button
              type='primary'
              icon={<PlusCircleFilled />}
              iconPosition='end'
              onClick={() => createNewColumn()}
            >Adicionar coluna</Button>
          </Flex>
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <KanbanColumn
                  issues={testIssues.filter(issue => issue.columnId == col.id)}
                  addIssue={addIssue}
                  updateColumn={updateColumn}
                  column={col}
                  onRemoveColumn={() => deleteColumn(col.id)}
                  deleteIssue={deleteIssue}
                />
              ))}
            </SortableContext>
            {createPortal(
              <DragOverlay>
                {activeColumn && (
                  <KanbanColumn
                    issues={testIssues.filter(issue => issue.columnId == activeColumn.id)}
                    addIssue={addIssue}
                    updateColumn={updateColumn}
                    column={activeColumn}
                    onRemoveColumn={() => deleteColumn(activeColumn.id)}
                    deleteIssue={deleteIssue}
                  />
                )}
                {activeIssue &&
                  <KanbanCard
                    issue={activeIssue}
                    deleteIssue={deleteIssue}
                  />
                }
              </DragOverlay>, document.body
            )}
          </DndContext>
        </KanbanBox>
      ) : (
        <Flex vertical gap={12}>
          {loading ? (
            Array.from({ length: 3 }).map(() => (
              <Skeleton.Input active style={{ width: "100%" }} />
            ))
          ) : (
            issues && issues.length > 0 ? (
              issues.map((issue, index) => (
                <ListItem
                  key={index}
                  id={issue.id}
                  titulo={issue.titulo}
                  classificacoes={issue.classificacoes}
                  descricao={issue.descricao}
                  prioridade={issue.prioridade}
                  status={issue.status}
                  responsaveis={issue.responsaveis}
                  dataCorrecao={issue.dataCorrecao}
                  onClick={() => handleIssueView(issue)}
                />
              ))
            ) : (
              <NoIssuesBox>
                <BugFilled style={{ fontSize: 40 }} />
                <Typography.Title level={4}>
                  Nenhum problema encontrado. Abra novos problemas para visualizá-los
                </Typography.Title>
              </NoIssuesBox>
            )
          )}
        </Flex>
      )}

      <NewIssue open={openModal} onClose={() => setOpenModal(false)} onOk={handleOkButton} />
      <IssueView open={openIssue} onClose={(e) => handleOkButton(e)} issue={issueId!} />
    </CustomBox>
  )
}

export default OpenIssues
