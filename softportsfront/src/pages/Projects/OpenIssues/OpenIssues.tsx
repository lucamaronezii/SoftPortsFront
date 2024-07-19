import { Button, Cascader, Flex, Input, Segmented, Spin, Typography, message } from 'antd'
import { NoIssuesBox } from './styles'
import { issueFilterItems } from '../../../utils/issueFilterItems'
import { segItems } from '../../../utils/segItems'
import { BugFilled, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { CustomRow } from '../../../components/CustomRow/styles'
import ListItem from '../components/ListItem/ListItem'
import { IIssue } from '../interfaces'
import NewIssue from '../components/NewIssue/NewIssue'
import IssueView from '../components/IssueView/IssueView'
import { getIssues } from '../../../services/IssueServices'
import { NoticeType } from 'antd/es/message/interface'
import { CustomBox } from '../styles'
import KanbanColumn from '../components/Kanban/KanbanColumn/KanbanColumn'
import KanbanBox from '../components/Kanban/KanbanBox/KanbanBox'
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import KanbanCard from '../components/Kanban/KanbanCard/KanbanCard'

type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
  }[]
}

const OpenIssues = () => {
  const [issues, setIssues] = useState<IIssue[]>([])
  const [input, setInput] = useState<string>('')
  const [seg, setSeg] = useState<number>(0)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false)
  const [openIssue, setOpenIssue] = useState<boolean>(false)
  const [issueId, setIssueId] = useState<IIssue>()
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [currentContainerId, setCurrentContainerId] = useState<UniqueIdentifier>()
  const [containerName, setContainerName] = useState<string>('')
  const [itemName, setItemName] = useState<string>('')
  const [showAddContainerModal, setShowAddContainerModal] = useState<boolean>(false)
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false)
  const [containers, setContainers] = useState<DNDType[]>([
    {
      id: `pending`,
      title: 'Pendente',
      items: [
        {
          id: 'item-teste-1',
          title: 'Item de teste 1'
        }
      ]
    },
    {
      id: `correction`,
      title: 'Em correção',
      items: [
        {
          id: 'item-teste-2',
          title: 'Item de teste 2'
        }
      ]
    },
    {
      id: `testing`,
      title: 'Testes',
      items: [
        {
          id: 'item-teste-3',
          title: 'Item de teste 3'
        }
      ]
    },
    {
      id: `waiting`,
      title: 'Aguardando aprovação',
      items: [
        {
          id: 'item-teste-4',
          title: 'Item de teste 4'
        }
      ]
    }
  ])

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
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetIssues()
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const { id } = active
    setActiveId(id)
  }

  const findValueOfItems = (id: UniqueIdentifier | undefined, type: string) => {
    if (type == 'container') {
      return containers.find((container) => container.id === id)
    } else if (type == 'item') {
      return containers.find((container: any) =>
        container.items.find((item: any) => item.id === id)
      )
    }
  }

  const findContainerItems = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, 'container');
    if (!container) return [];
    return container.items;
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, 'item')
      const overContainer = findValueOfItems(over.id, 'item')
      if (!activeContainer || !overContainer) return

      const activeContainerIndex = containers.findIndex((container) => container.id === activeContainer.id)
      const overContainerIndex = containers.findIndex((container) => container.id === overContainer.id)
      const activeItemIndex = activeContainer.items.findIndex((item) => item.id === active.id)
      const overItemIndex = overContainer.items.findIndex((item) => item.id === over.id)

      if (activeContainer === overContainer) {
        let newItems = { ...containers }
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeItemIndex,
          overItemIndex
        )

        setContainers(newItems)
      } else {
        let newItems = { ...containers }
        const [removedItem] = newItems[activeContainerIndex].items.splice(
          activeItemIndex,
          1
        )
        newItems[overContainerIndex].items.splice(
          overItemIndex,
          0,
          removedItem
        )
        setContainers(newItems)
      }
    }

    // Handling Item Drop into a container
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'container');

      // If the active or over container is undefined, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      const activeItemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      )

      let newItems = [...containers];
      const [removedItem] = newItems[activeContainerIndex].items.splice(
        activeItemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removedItem);
      setContainers(newItems);

    }

  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes('container') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id,
      );
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('item') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'item');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id,
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id,
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id,
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );

        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1,
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem,
        );
        setContainers(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'container');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id,
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id,
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1,
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
    setActiveId(null);
  }

  return (
    <CustomBox style={{ height: '85vh' }}>
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
          {/* <KanbanColumn
            title='Pendente'
            onClick={() => setOpenModal(true)}
          />
          <KanbanColumn
            title='Em correção'
            onClick={() => setOpenModal(true)}
          />
          <KanbanColumn
            title='Testes'
            onClick={() => setOpenModal(true)}
          />
          <KanbanColumn
            title='Aguardando fechamento'
            onClick={() => setOpenModal(true)}
          /> */}

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={containers.map((container) => container.id)}>
              {containers.map((container) => (
                <KanbanColumn
                  key={container.id}
                  title={container.title}
                  id={container.id}
                  onAddItem={() => { }}
                >
                  <SortableContext
                    items={container.items.map((i) => i.id)}
                  >
                    <Flex gap={5}>
                      {container.items.map((item) => (
                        <KanbanCard id={item.id} />
                      ))}
                    </Flex>
                  </SortableContext>
                </KanbanColumn>
              ))}
            </SortableContext>
          </DndContext>
        </KanbanBox>
      ) : (
        <>
          {loading ? (
            <Spin size='large' style={{ marginTop: 35 }} />
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
        </>
      )}

      <NewIssue open={openModal} onClose={() => setOpenModal(false)} onOk={handleOkButton} />
      <IssueView open={openIssue} onClose={(e) => handleOkButton(e)} issue={issueId!} />
    </CustomBox>
  )
}

export default OpenIssues
