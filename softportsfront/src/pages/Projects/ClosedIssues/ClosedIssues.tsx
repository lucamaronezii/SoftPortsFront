import { Cascader, DatePicker, Flex, Input, Spin, Typography } from 'antd'
import { issueFilterItems } from '../../../utils/issueFilterItems'
import { useState } from 'react'
import { CustomRow } from '../../../components/CustomRow/styles'
import { CustomBox } from '../styles'
import { NoIssuesBox } from '../OpenIssues/styles'
import { BugFilled } from '@ant-design/icons'
import { IIssue } from '../interfaces'
import { issuesList } from '../../../mocks/Issues'
import ClosedIssue from '../components/ClosedIssue/ClosedIssue'

const OpenIssues = () => {
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [issues, setIssues] = useState<IIssue[]>(issuesList)

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
            placeholder='Filtrar ocorrências'
            multiple
            options={issueFilterItems}
            maxTagCount={'responsive'}
          />
          <DatePicker.RangePicker format={'DD/MM/YYYY'} />
        </Flex>
      </CustomRow>

      {loading ? (
        <Spin size='large' style={{ marginTop: 35 }} />
      ) : (
        issues && issues.length > 0 ? (
          issues.map((issue, index) => (
            <ClosedIssue
              key={index}
              id={issue.id}
              classificacoes={issue.classificacoes}
              dataCorrecao={issue.dataCorrecao}
              descricao={issue.descricao}
              prioridade={issue.prioridade}
              responsaveis={issue.responsaveis}
              status={issue.status}
              titulo={issue.titulo}
              caminho={issue.caminho}
              casosDeTestes={issue.casosDeTestes}
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
    </CustomBox>
  )
}

export default OpenIssues
