import { PlusOutlined } from '@ant-design/icons'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { Button, Cascader, Flex, Input, Segmented, Typography, message } from 'antd'
import { NoticeType } from 'antd/es/message/interface'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDebounce } from 'use-debounce'
import teste from '../../../assets/empty.svg'
import { useAxios } from '../../../auth/useAxios'
import { CustomRow } from '../../../components/CustomRow/styles'
import SkeletonGroup from '../../../components/SkeletonGroup/SkeletonGroup'
import useProjects from '../../../hooks/useProjects'
import { statusList } from '../../../utils/getStatus'
import { classList } from '../../../utils/getClass'
import { priorityList } from '../../../utils/getPriority'
import { manipulateUsers } from '../../../utils/getUsers'
import { segItems } from '../../../utils/segItems'
import { IUser } from '../../Users/interfaces'
import IssueView from '../components/IssueView/IssueView'
import KanbanBox from '../components/Kanban/KanbanBox/KanbanBox'
import KanbanCard from '../components/Kanban/KanbanCard/KanbanCard'
import KanbanColumn from '../components/Kanban/KanbanColumn/KanbanColumn'
import { Column, Id } from '../components/Kanban/KanbanColumn/types'
import ListItem from '../components/ListItem/ListItem'
import NewIssue from '../components/NewIssue/NewIssue'
import { IIssue, IProjectPage } from '../interfaces'
import { CustomBox } from '../styles'
import { IssuesBox, NoIssuesBox } from './styles'

const OpenIssues: React.FC<IProjectPage> = ({ loadingUsers, users }) => {
  const [issues, setIssues] = useState<IIssue[]>([])
  const [input, setInput] = useState<string>()
  const [debounce] = useDebounce(input, 500)
  const [filterPriority, setFilterPriority] = useState<number[]>([])
  const [filterUsers, setFilterUsers] = useState<number[]>([])
  const [seg, setSeg] = useState<number>(0)
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(true)
  const [openIssue, setOpenIssue] = useState<boolean>(false)
  const [issueId, setIssueId] = useState<IIssue>()
  const [testIssues, setTestIssues] = useState<IIssue[]>([])
  const [selectedKanban, setSelectedKanban] = useState<number>()
  const { selectedProject } = useProjects()
  const axios = useAxios()

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
      handleMessage('success', 'Ocorrência aberta com sucesso.')
      handleGetIssues()
    } else if (status == "deleted") {
      handleMessage('success', 'Ocorrência excluída com sucesso.')
      handleGetIssues()
    } else if (status == "updated") {
      handleMessage('success', 'Ocorrência atualizada com sucesso.')
      handleGetIssues()
    }
    setOpenForm(false)
    setOpenIssue(false)
  }

  const handleGetIssues = async () => {
    setLoading(true)
    let params = `projetoId=${selectedProject.id}&fechada=false`
    input && (params += `&titulo=${input}`)
    filterPriority.length && (params += `&prioridades=${filterPriority}`)
    filterUsers.length && (params += `&usuarios=${filterUsers}`)
    await axios.get(`tarefa?${params}`)
      .then(res => setIssues(res.data.conteudo))
      .catch(err => console.error(err))
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 700)
      })
  }

  useEffect(() => {
    handleGetIssues()
  }, [selectedProject, debounce, filterPriority, filterUsers])

  const [columns, setColumns] = useState<Column[]>(statusList)

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
      dataEstimada: 1,
      descricao: '',
      prioridade: 1,
      usuarios: [],
      status: 1,
      titulo: `Issue ${testIssues.length + 1}`,
      caminho: '',
      screenshots: [],
      versaoSO: '',
      columnId: columnId
    }

    setTestIssues([...testIssues, newIssue])
  }

  const deleteIssue = (id: Id) => {
    const newIssues = testIssues.filter(issue => issue.id !== id)
    setTestIssues(newIssues)
  }

  const handleOpenForm = (col?: Column) => {
    col ? setSelectedKanban(Number(col.id)) : setSelectedKanban(undefined)
    setOpenForm(true)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handlePriority = (array: any[]) => {
    return array.includes('priority')
      ? setFilterPriority([1, 2, 3, 4])
      : setFilterPriority(array)
  }

  const getUsersId = (users: IUser[]) => {
    const usersIds = users.map(user => user.id)
    return usersIds
  }

  const handleUsers = (array: any[]) => {
    return array.includes('users')
      ? setFilterUsers(getUsersId(users))
      : setFilterUsers(array)
  }

  const handleClass = () => { }

  const handleCascaderChange = (e: (string | number)[][]) => {
    console.log(e)
    if (!e.length) {
      handleClear()
    }
    let priorityArray: (string | number)[] = []
    let usersArray: (string | number)[] = []
    let classArray = []

    e.map(valor => {
      const selectedAll = valor.length == 1
      if (valor[0] == 'priority') selectedAll ? priorityArray.push(valor[0]) : priorityArray.push(valor[1])
      if (valor[0] == 'class') { }
      if (valor[0] == 'users') selectedAll ? usersArray.push(valor[0]) : usersArray.push(valor[1])
    })

    priorityArray.length && handlePriority(priorityArray)
    usersArray.length && handleUsers(usersArray)
  }

  const handleClear = () => {
    setFilterPriority([]); setFilterUsers([])
  }

  return (
    <CustomBox>
      {contextHolder}
      <CustomRow>
        <Flex gap={15}>
          <div style={{ maxWidth: '300px' }}>
            <Input.Search
              value={input}
              onChange={handleInputChange}
              placeholder='Pesquisar ocorrência'
              allowClear
              enterButton
            />
          </div>
          <Cascader
            disabled={loadingUsers}
            loading={loadingUsers}
            options={[...classList, ...priorityList, manipulateUsers(users)]}
            onClear={handleClear}
            onChange={handleCascaderChange}
            placeholder='Filtrar ocorrências'
            maxTagCount={'responsive'}
            multiple
            removeIcon
          />
          <Segmented
            value={seg}
            options={segItems}
            onChange={(e) => setSeg(e)}
          />
        </Flex>
        <Button
          onClick={() => handleOpenForm()}
          icon={<PlusOutlined />}
          type='primary'
          iconPosition='end'
        >
          Nova ocorrência
        </Button>
      </CustomRow>

      {seg ? (
        <KanbanBox>
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
        <IssuesBox>
          {loading ? (
            <SkeletonGroup total={3} />
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
                  usuarios={issue.usuarios}
                  dataEstimada={issue.dataEstimada}
                  onClick={() => handleIssueView(issue)}
                />
              ))
            ) : (
              <NoIssuesBox>
                <img src={teste} width={500} />
                <Typography.Title level={4}>
                  Nenhuma ocorrência encontrada. Abra novas ocorrências para visualizá-las
                </Typography.Title>
              </NoIssuesBox>
            )
          )}
        </IssuesBox>
      )}

      <NewIssue open={openForm} onClose={() => setOpenForm(false)} onOk={handleOkButton} selectedKanban={selectedKanban} />
      <IssueView open={openIssue} onClose={(e) => handleOkButton(e)} issue={issueId!} />
    </CustomBox>
  )
}

export default OpenIssues
