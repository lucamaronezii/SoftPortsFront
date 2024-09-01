import { CheckCircleOutlined } from '@ant-design/icons'
import { Cascader, DatePicker, Flex, Input, message, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import img from '../../../assets/empty.svg'
import { useAxios } from '../../../auth/useAxios'
import { CustomRow } from '../../../components/CustomRow/styles'
import SkeletonGroup from '../../../components/SkeletonGroup/SkeletonGroup'
import useProjects from '../../../hooks/useProjects'
import { classList } from '../../../utils/getClass'
import { priorityList } from '../../../utils/getPriority'
import { manipulateUsers } from '../../../utils/getUsers'
import { IUser } from '../../Users/interfaces'
import ClosedIssue from '../components/ClosedIssue/ClosedIssue'
import { IIssue, IProjectPage, IShortIssue } from '../interfaces'
import { IssuesBox, NoIssuesBox } from '../OpenIssues/styles'
import { CustomBox } from '../styles'
import ConfigProvider from '../../../config/ConfigProvider'
import IssueView from '../components/IssueView/IssueView'

const OpenIssues: React.FC<IProjectPage> = ({ loadingUsers, users }) => {
  const [input, setInput] = useState<string>()
  const [debounce] = useDebounce(input, 500)
  const [loading, setLoading] = useState<boolean>(true)
  const [closedIssues, setClosedIssues] = useState<IIssue[]>([])
  const [filterPriority, setFilterPriority] = useState<number[]>([])
  const [filterUsers, setFilterUsers] = useState<number[]>([])
  const [filterClass, setFilterClass] = useState<number[]>([])
  const [filterDate, setFilterDate] = useState<string[]>([])
  const [messageApi, contextHolder] = message.useMessage()
  const [openIssue, setOpenIssue] = useState<boolean>(false)
  const [selectedIssue, setSelectedIssue] = useState<IShortIssue>()
  const { selectedProject } = useProjects()
  const axios = useAxios()

  const handleGetClosedIssues = async () => {
    setLoading(true)
    let params = `projetoId=${selectedProject.id}&fechada=true`
    input && (params += `&titulo=${input}`)
    filterPriority.length && (params += `&prioridades=${filterPriority}`)
    filterUsers.length && (params += `&usuarios=${filterUsers}`)
    filterDate.length && (params += `&dataInicio=${filterDate[0]}&dataFim=${filterDate[1]}`)
    filterClass.length && (params += `&classificacao=${filterClass}`)
    await axios.get(`tarefa?${params}`)
      .then(res => setClosedIssues(res.data.conteudo))
      .catch(err => console.error(err))
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 700)
      })
  }

  const handleOkButton = (status?: string | undefined) => {
    if (status == "close" || !status) {
      // pass
    } else if (status == "success") {
      messageApi.success('Ocorrência aberta com sucesso.')
      handleGetClosedIssues()
    } else if (status == "deleted") {
      messageApi.success('Ocorrência excluída com sucesso.')
      handleGetClosedIssues()
    } else if (status == "updated") {
      messageApi.success('Ocorrência atualizada com sucesso.')
      handleGetClosedIssues()
    } else if (status == "issueClosed") {
      messageApi.success('Ocorrência fechada com sucesso.')
      handleGetClosedIssues()
    } else if (status == "issueReopened") {
      messageApi.success('Ocorrência reaberta com sucesso.')
      handleGetClosedIssues()
    }
    setOpenIssue(false)
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

  const handleCascaderChange = (e: (string | number)[][], a: any) => {
    console.log(a)
    if (!e.length) {
      handleClear()
    }
    let priorityArray: (string | number)[] = []
    let usersArray: (string | number)[] = []
    let classArray: (string | number)[] = []

    e.map(valor => {
      const selectedAll = valor.length == 1
      if (valor[0] == 'priority') selectedAll ? priorityArray.push(valor[0]) : priorityArray.push(valor[1])
      if (valor[0] == 'class') { }
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
    setFilterPriority([]); setFilterUsers([])
  }

  useEffect(() => {
    handleGetClosedIssues()
  }, [filterPriority, filterUsers, debounce, filterDate, filterClass])

  const handleRangeChange = (_: any, dateStrings: [string, string]) => {
    if (dateStrings[0] == '') {
      setFilterDate([])
    } else {
      const date1 = dayjs(dateStrings[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
      const date2 = dayjs(dateStrings[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
      setFilterDate([date1, date2])
    }
  }

  const onReopen = () => {
    messageApi.success('Ocorrência reaberta com sucesso.')
    handleGetClosedIssues()
  }

  const handleIssueView = (issue: IIssue) => {
    setOpenIssue(true)
    setSelectedIssue({ id: issue.id, titulo: issue.titulo })
  }

  return (
    <>
      {contextHolder}
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
              closedIssues.map((issue, index) => (
                <ClosedIssue
                  key={index}
                  issue={issue}
                  onClick={() => handleIssueView(issue)}
                  onReopen={() => onReopen()}
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

      {selectedIssue &&
        <IssueView
          open={openIssue}
          projectUsers={users}
          issueId={selectedIssue.id}
          issueTitle={selectedIssue.titulo}
          onClose={(e) => handleOkButton(e)}
        />
      }
    </>
  )
}

export default OpenIssues
