import { PlusOutlined } from '@ant-design/icons'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { Button, Cascader, Flex, Input, Segmented, Skeleton, Typography, message } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDebounce } from 'use-debounce'
import emptySvg from '../../../assets/empty.svg'
import { useAxios } from '../../../auth/useAxios'
import { CustomRow } from '../../../components/CustomRow/styles'
import SkeletonList from '../../../components/SkeletonGroup/SkeletonList'
import useProjects from '../../../hooks/useProjects'
import { classList } from '../../../utils/getClass'
import { priorityList } from '../../../utils/getPriority'
import { statusList } from '../../../utils/getStatus'
import { manipulateUsers } from '../../../utils/getUsers'
import { segItems } from '../../../utils/segItems'
import { IUser } from '../../Users/interfaces'
import IssueView from '../components/IssueView/IssueView'
import KanbanBox from '../components/Kanban/KanbanBox/KanbanBox'
import KanbanCard from '../components/Kanban/KanbanCard/KanbanCard'
import KanbanColumn from '../components/Kanban/KanbanColumn/KanbanColumn'
import { Column } from '../components/Kanban/KanbanColumn/types'
import ListItem from '../components/ListItem/ListItem'
import NewIssue from '../components/NewIssue/NewIssue'
import { IIssue, IProjectPage, IShortIssue } from '../interfaces'
import { CustomBox } from '../styles'
import { IssuesBox, NoIssuesBox } from './styles'
import SkeletonKanban from '../../../components/SkeletonGroup/SkeletonKanban'

const OpenIssues: React.FC<IProjectPage> = ({ loadingUsers, users }) => {
  const [issues, setIssues] = useState<IIssue[]>([])
  const [input, setInput] = useState<string>()
  const [debounce] = useDebounce(input, 500)
  const [filterPriority, setFilterPriority] = useState<number[]>([])
  const [filterUsers, setFilterUsers] = useState<number[]>([])
  const [filterClass, setFilterClass] = useState<number[]>([])
  const [seg, setSeg] = useState<number>(0)
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(true)
  const [openIssue, setOpenIssue] = useState<boolean>(false)
  const [selectedIssue, setSelectedIssue] = useState<IShortIssue>()
  const [selectedKanban, setSelectedKanban] = useState<number>()
  const [columns, setColumns] = useState<Column[]>(statusList)
  const { selectedProject } = useProjects()
  const axios = useAxios()

  const handleIssueView = (issue: IIssue) => {
    setOpenIssue(true)
    setSelectedIssue({ id: Number(issue.id), titulo: issue.titulo })
  }

  const handleOkButton = (status?: string | undefined) => {
    if (status == "close" || !status) {
      // pass
    } else if (status == "success") {
      messageApi.success('Ocorrência aberta com sucesso.')
      handleGetIssues()
    } else if (status == "deleted") {
      messageApi.success('Ocorrência excluída com sucesso.')
      handleGetIssues()
    } else if (status == "updated") {
      messageApi.success('Ocorrência atualizada com sucesso.')
      handleGetIssues()
    } else if (status == "issueClosed") {
      messageApi.success('Ocorrência fechada com sucesso.')
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
    filterClass.length && (params += `&classificacao=${filterClass}`)

    await axios.get(`tarefa?${params}`)
      .then(res => {
        const mappedIssues = res.data.conteudo.map((issue: IIssue) => ({
          ...issue,
          id: String(issue.id),
          columnId: issue.status,
        }));
        setIssues(mappedIssues);
      })
      .catch(err => console.error(err))
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 1500)
      })
  }

  useEffect(() => {
    handleGetIssues()
  }, [selectedProject, debounce, filterPriority, filterUsers, filterClass])

  const columnsId = useMemo(() => columns.map(col => col.id), [columns])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeIssue, setActiveIssue] = useState<IIssue | null>(null)

  const handleStatusChange = async (issueId: number, newStatus: number) => {
    await axios.put(`tarefa/status/${issueId}?status=${newStatus}`)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

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

    if (active.data.current?.type === "IIssue") {
      const crtIssue = active.data.current!
      if (crtIssue.issue.columnId !== crtIssue.issue.status) {
        handleStatusChange(crtIssue.issue.id, crtIssue.issue.columnId)
        const updatedIssues = issues.map(issue => issue.id === crtIssue.issue.id ? { ...issue, status: crtIssue.issue.columnId } : issue)
        setIssues([...updatedIssues])
      }
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
      setIssues(issues => {
        const activeIndex = issues.findIndex(t => t.id == activeId)
        const overIndex = issues.findIndex(t => t.id == overId)

        issues[activeIndex].columnId = issues[overIndex].columnId

        return arrayMove(issues, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === "Column"

    if (isActiveIssue && isOverAColumn) {
      const activeIndex = issues.findIndex(t => t.id == activeId)

      issues[activeIndex].columnId = Number(overId)

      return arrayMove(issues, activeIndex, activeIndex)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  const updateColumn = (id: number, text: string) => {
    const newColumns = columns.map(col => {
      if (col.id !== id) return col
      return { ...col, text }
    })

    setColumns(newColumns)
  }

  const deleteIssue = (id: number) => {
    const newIssues = issues.filter(issue => issue.id !== id)
    setIssues(newIssues)
  }

  const handleOpenForm = (id?: number) => {
    id ? setSelectedKanban(Number(id)) : setSelectedKanban(undefined)
    setOpenForm(true)
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

  const handleClass = (array: any[]) => {
    return array.includes(0)
      ? setFilterClass([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      : setFilterClass(array)
  }

  const handleCascaderChange = (e: (string | number)[][]) => {
    if (!e.length) handleClear()

    let priorityArray: (string | number)[] = []
    let usersArray: (string | number)[] = []
    let classArray: (string | number)[] = []

    e.map(valor => {
      const selectedAll = valor.length == 1
      if (valor[0] == 'priority') selectedAll ? priorityArray.push(valor[0]) : priorityArray.push(valor[1])
      if (valor[0] == 'users') selectedAll ? usersArray.push(valor[0]) : usersArray.push(valor[1])
      if (valor[0] == 0) {
        if (valor.length === 3) {
          classArray.push(valor[1], valor[2])
        } else if (valor.length === 2) {
          classArray.push(valor[1])
        } else if (valor.length === 1) {
          classArray.push(0)
        }
      }
    })

    priorityArray.length && handlePriority(priorityArray)
    usersArray.length && handleUsers(usersArray)
    classArray.length && handleClass(classArray)
  }

  const handleClear = () => {
    setFilterPriority([]); setFilterUsers([]); setFilterClass([])
  }

  const displayIssuesPositions = () => {
    const positions = columns.map(column => {
      const issuesInColumn = issues.filter(issue => issue.columnId === column.id);
      return {
        columnTitle: column.title,
        issues: issuesInColumn.map((issue, index) => ({
          title: issue.titulo,
          position: index + 1,
        }))
      };
    });

    return positions;
  };

  useEffect(() => {
    const issuesPositions = displayIssuesPositions();
  }, [columns, issues, seg]);

  return (
    <CustomBox>
      {contextHolder}
      <CustomRow>
        <Flex gap={15}>
          <div style={{ maxWidth: '300px' }}>
            <Input.Search
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
          iconPosition='end'>
          Nova ocorrência</Button>
      </CustomRow>

      {seg ? (
        <KanbanBox>
          {loading ? (
            <SkeletonKanban total={5} />
          ) : (
            <DndContext
              sensors={sensors}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
            >
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <KanbanColumn
                    issues={issues.filter(issue => issue.columnId == col.id)}
                    updateColumn={updateColumn}
                    column={col}
                    deleteIssue={deleteIssue}
                    onAdd={handleOpenForm}
                    onView={handleIssueView}
                  />
                ))}
              </SortableContext>
              {createPortal(
                <DragOverlay>
                  {activeColumn && (
                    <KanbanColumn
                      issues={issues.filter(issue => issue.columnId == activeColumn.id)}
                      updateColumn={updateColumn}
                      column={activeColumn}
                      deleteIssue={deleteIssue}
                      onView={handleIssueView}
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
          )}
        </KanbanBox>
      ) : (
        <IssuesBox>
          {loading ? (
            <SkeletonList total={3} />
          ) : (
            issues && issues.length > 0 ? (
              issues.map((issue, index) => (
                <ListItem
                  key={index}
                  id={issue.id}
                  titulo={issue.titulo}
                  classificacao={issue.classificacao}
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
                <img src={emptySvg} width={500} />
                <Typography.Title level={4}>
                  Nenhuma ocorrência encontrada. Abra novas ocorrências para visualizá-las
                </Typography.Title>
              </NoIssuesBox>
            )
          )}
        </IssuesBox>
      )}

      {selectedIssue &&
        <IssueView
          open={openIssue}
          projectUsers={users}
          issueId={selectedIssue.id}
          issueTitle={selectedIssue.titulo}
          onClose={(e) => handleOkButton(e)}
        />
      }

      <NewIssue
        open={openForm}
        projectUsers={users}
        selectedKanban={selectedKanban}
        onOk={handleOkButton}
        onClose={() => setOpenForm(false)}
      />
    </CustomBox>
  )
}

export default OpenIssues
