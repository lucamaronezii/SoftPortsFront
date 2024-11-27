import { Col, Flex, Input, message, Row, Spin, Typography } from 'antd'
import { CustomBox } from '../styles'
import { requestsMock } from '../../../mocks/Requests'
import RequestCard from './components/RequestCard'
import { CustomRow } from '../components/IssueView/styles'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import RequestForm from '../components/RequestForm/RequestForm'
import { useAxios } from '../../../auth/useAxios'
import { IRequest } from './interfaces'
import useProjects from '../../../hooks/useProjects'
import emptySvg from '../../../assets/empty.svg'
import { NoIssuesBox } from '../OpenIssues/styles'

const Requests = () => {
  const [input, setInput] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedRequest, setSelectedRequest] = useState<number | undefined>()
  const [requests, setRequests] = useState<IRequest[]>([])
  const [messageApi, contextHolder] = message.useMessage()
  const [debounce] = useDebounce(input, 800)
  const { selectedProject } = useProjects()
  const axios = useAxios()

  const getRequests = async () => {
    await axios.get(`/solicitacao?titulo=${input}&projetoId=${selectedProject.id}`)
      .then(res => setRequests(res.data.conteudo))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
    console.log(requests)
  }

  const handleSelect = (id: number) => {
    setSelectedRequest(id)
    setOpen(true)
  }

  const onSuccessAccept = () => {
    setOpen(false)
    messageApi.success('Solicitação aceita com sucesso.')
    getRequests()
  }

  const onSuccessReject = () => {
    setOpen(false)
    messageApi.success('Solicitação recusada com sucesso.')
    getRequests()
  }

  useEffect(() => {
    getRequests()
  }, [debounce])

  return (
    <CustomBox>
      {contextHolder}
      <CustomRow>
        <Flex gap={15}>
          <div style={{ maxWidth: '300px' }}>
            <Input.Search
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Pesquisar solicitação'
              allowClear
              enterButton
            />
          </div>
        </Flex>
      </CustomRow>

      {loading ? (
        <Flex align='center' justify='center' style={{ flexGrow: 1 }}>
          <Spin size='large' />
        </Flex>
      ) : requests.length >= 1 ? (
        <Row gutter={[8, 8]}>
          {requests.map((request, index) => (
            <Col span={6}>
              <RequestCard
                key={index}
                request={request}
                onView={() => handleSelect(request.id)}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <NoIssuesBox>
          <img src={emptySvg} width={500} />
          <Typography.Title level={4}>
            Nenhuma solicitação encontrada.
          </Typography.Title>
        </NoIssuesBox>
      )}

      {selectedRequest &&
        <RequestForm
          onSuccessAccept={() => onSuccessAccept()}
          onSuccessReject={() => onSuccessReject()}
          selectedRequest={selectedRequest}
          open={open}
          onClose={() => setOpen(false)}
        />
      }
    </CustomBox>
  )
}

export default Requests
