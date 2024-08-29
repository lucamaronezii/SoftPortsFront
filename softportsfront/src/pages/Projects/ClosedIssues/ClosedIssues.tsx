import { Cascader, DatePicker, Flex, Input, Spin, Typography } from 'antd'
import { issueFilterItems } from '../../../utils/issueFilterItems'
import { useEffect, useState } from 'react'
import { CustomRow } from '../../../components/CustomRow/styles'
import { CustomBox } from '../styles'
import { IssuesBox, NoIssuesBox } from '../OpenIssues/styles'
import { BugFilled } from '@ant-design/icons'
import { IIssue, IProjectPage } from '../interfaces'
import { issuesList } from '../../../mocks/Issues'
import ClosedIssue from '../components/ClosedIssue/ClosedIssue'
import { IUser } from '../../Users/interfaces'
import { classList } from '../../../utils/getClass'
import { priorityItems } from '../../../utils/getPriority'
import { manipulateUsers } from '../../../utils/getUsers'
import { useAxios } from '../../../auth/useAxios'
import useProjects from '../../../hooks/useProjects'
import SkeletonGroup from '../../../components/SkeletonGroup/SkeletonGroup'

const OpenIssues: React.FC<IProjectPage> = ({ loadingUsers, users }) => {
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [closedIssues, setClosedIssues] = useState<IIssue[]>([])
  const [priority, setPriority] = useState<number[]>([])
  const [_users, _setUsers] = useState<IUser[]>(users)
  const [issues, setIssues] = useState<IIssue[]>(issuesList)
  const { selectedProject } = useProjects()
  const axios = useAxios()

  const handleGetClosedIssues = async () => {
    await axios.get(`tarefa?projectId=${selectedProject.id}&fechada=true`)
      .then(res => setClosedIssues(res.data.conteudo))
      .catch(err => console.error(err))
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      })
  }

  useEffect(() => {
    handleGetClosedIssues()
  }, [])

  return (
    <CustomBox>
      <CustomRow>
        <Flex gap={15}>
          <div style={{ maxWidth: '300px' }}>
            <Input.Search
              value={input}
              placeholder='Pesquisar ocorrência'
              allowClear
              enterButton
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Cascader
            removeIcon
            disabled={loadingUsers}
            options={[...classList, ...priorityItems, manipulateUsers(users)]}
            loading={loadingUsers}
            placeholder='Filtrar ocorrências'
            multiple
            maxTagCount={'responsive'}
          />
          <DatePicker.RangePicker format={'DD/MM/YYYY'} />
        </Flex>
      </CustomRow>

      <IssuesBox>
        {loading ? (
          <SkeletonGroup total={3} />
        ) : (
          issues && issues.length > 0 ? (
            issues.map((issue, index) => (
              <ClosedIssue
                key={index}
                id={issue.id}
                classificacao={issue.classificacao}
                dataEstimada={issue.dataEstimada}
                descricao={issue.descricao}
                prioridade={issue.prioridade}
                usuarios={issue.usuarios}
                status={issue.status}
                titulo={issue.titulo}
                caminho={issue.caminho}
              />
            ))
          ) : (
            <NoIssuesBox>
              <BugFilled style={{ fontSize: 40 }} />
              <Typography.Title level={4}>
                Nenhum issue fechado encontrado. Feche issues para visualizá-los
              </Typography.Title>
            </NoIssuesBox>
          )
        )}
      </IssuesBox>
    </CustomBox>
  )
}

export default OpenIssues
