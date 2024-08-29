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

const OpenIssues: React.FC<IProjectPage> = ({ loadingUsers, users }) => {
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [closedIssues, setClosedIssues] = useState<IIssue[]>([])
  const [priority, setPriority] = useState<number[]>([])
  const [_users, _setUsers] = useState<IUser[]>(users)
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
            options={[...classList, ...priorityList, manipulateUsers(users)]}
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
          closedIssues && closedIssues.length > 0 ? (
            closedIssues.map((ci, index) => (
              <ClosedIssue
                key={index}
                id={ci.id}
                classificacoes={ci.classificacoes}
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
                Nenhuma ocorrência encontrada. Feche novas ocorrências para visualizá-las
              </Typography.Title>
            </NoIssuesBox>
          )
        )}
      </IssuesBox>
    </CustomBox>
  )
}

export default OpenIssues
