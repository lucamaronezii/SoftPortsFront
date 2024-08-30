import { Cascader, DatePicker, Flex, Input, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useAxios } from '../../../auth/useAxios'
import { CustomRow } from '../../../components/CustomRow/styles'
import SkeletonGroup from '../../../components/SkeletonGroup/SkeletonGroup'
import useProjects from '../../../hooks/useProjects'
import { classList } from '../../../utils/getClass'
import { priorityList } from '../../../utils/getPriority'
import { manipulateUsers } from '../../../utils/getUsers'
import { IUser } from '../../Users/interfaces'
import ClosedIssue from '../components/ClosedIssue/ClosedIssue'
import { IIssue, IProjectPage } from '../interfaces'
import { IssuesBox, NoIssuesBox } from '../OpenIssues/styles'
import { CustomBox } from '../styles'
import img from '../../../assets/empty.svg'
import { useDebounce } from 'use-debounce'
import dayjs, { Dayjs } from 'dayjs'

const OpenIssues: React.FC<IProjectPage> = ({ loadingUsers, users }) => {
  const [input, setInput] = useState<string>()
  const [debounce] = useDebounce(input, 500)
  const [loading, setLoading] = useState<boolean>(true)
  const [closedIssues, setClosedIssues] = useState<IIssue[]>([])
  const [filterPriority, setFilterPriority] = useState<number[]>([])
  const [filterUsers, setFilterUsers] = useState<number[]>([])
  const [filterDate, setFilterDate] = useState<string[]>([])
  const { selectedProject } = useProjects()
  const axios = useAxios()

  const handleGetClosedIssues = async () => {
    setLoading(true)
    let params = `projetoId=${selectedProject.id}&fechada=true`
    input && (params += `&titulo=${input}`)
    filterPriority.length && (params += `&prioridades=${filterPriority}`)
    filterUsers.length && (params += `&usuarios=${filterUsers}`)
    filterDate.length && (params += `&dataInicio=${filterDate[0]}&dataFim=${filterDate[1]}`)
    await axios.get(`tarefa?${params}`)
      .then(res => setClosedIssues(res.data.conteudo))
      .catch(err => console.error(err))
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 700)
      })
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

  useEffect(() => {
    handleGetClosedIssues()
  }, [])

  const handleCascaderChange = (e: (string | number)[][], a: any) => {
    console.log(a)
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

  useEffect(() => {
    handleGetClosedIssues()
  }, [filterPriority, filterUsers, debounce, filterDate])

  const handleRangeChange = (_: any, dateStrings: [string, string]) => {
    if (dateStrings[0] == '') {
      setFilterDate([])
    } else {
      const date1 = dayjs(dateStrings[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
      const date2 = dayjs(dateStrings[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
      setFilterDate([date1, date2])
    }
  }

  return (
    <CustomBox>
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
            removeIcon
            disabled={loadingUsers}
            options={[...classList, ...priorityList, manipulateUsers(users)]}
            loading={loadingUsers}
            placeholder='Filtrar ocorrências'
            multiple
            maxTagCount={'responsive'}
            onChange={handleCascaderChange}
          />
          <DatePicker.RangePicker
            format={'DD/MM/YYYY'}
            onChange={handleRangeChange}
          />
        </Flex>
      </CustomRow>

      <IssuesBox>
        {loading ? (
          <SkeletonGroup total={3} />
        ) : (
          closedIssues && closedIssues.length > 0 ? (
            closedIssues.map((ci, index) => (
              <ClosedIssue
                key={index}
                id={ci.id}
                classificacao={ci.classificacao}
                dataEstimada={ci.dataEstimada}
                descricao={ci.descricao}
                prioridade={ci.prioridade}
                usuarios={ci.usuarios}
                status={ci.status}
                titulo={ci.titulo}
                caminho={ci.caminho}
              />
            ))
          ) : (
            <NoIssuesBox>
              <img src={img} width={500} />
              <Typography.Title level={4}>
                Nenhuma ocorrência encontrada. Feche ocorrências para visualizá-las
              </Typography.Title>
            </NoIssuesBox>
          )
        )}
      </IssuesBox>
    </CustomBox>
  )
}

export default OpenIssues
