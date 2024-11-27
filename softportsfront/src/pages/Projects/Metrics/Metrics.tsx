import { QuestionCircleOutlined } from '@ant-design/icons'
import { Divider, Flex, Progress, Spin, Tooltip, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { tagColor } from '../../../utils/getPriority'
import { CustomBox } from '../styles'
import { CustomFlex, TypographySub } from './styles'
import { useAxios } from '../../../auth/useAxios'
import useProjects from '../../../hooks/useProjects'

interface IPriorityData {
  prioridadeId: number;
  valor: number;
}
// {
// 	"overallConflictDensity": 44.827586206896555,
// 	"priorityConflictDensity": [
// 		{
// 			"prioridadeId": 1,
// 			"valor": 60.000003814697266
// 		},
// 		{
// 			"prioridadeId": 4,
// 			"valor": 12.5
// 		}
// 	]
// }

const Metrics = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [all, setAll] = useState<number>(0)
  const [critical, setCritical] = useState<number>(0)
  const [high, setHigh] = useState<number>(0)
  const [mid, setMid] = useState<number>(0)
  const [low, setLow] = useState<number>(0)
  const { selectedProject } = useProjects()
  const axios = useAxios()

  const info = () => {
    return (
      <Flex vertical gap={12}>
        <Typography>
          {"- Baixa densidade (< 15%): Projeto está com bom alinhamento entre tarefas e derivados"}
        </Typography>
        <Typography>
          {"- Média densidade (15% - 40%): Alerta moderado, possíveis ajustes nos requisitos ou derivados podem ser necessários"}
        </Typography>
        <Typography>
          {"- Alta densidade (> 40%): Muitos conflitos, o que pode afetar o andamento do projeto. Requer ação imediata"}
        </Typography>
      </Flex>
    )
  }

  const getMetrics = async () => {
    setTimeout(() => {
      axios.get(`/dashboard/metricas/${selectedProject.id}`)
        .then(res => {
          setAll(res.data.overallConflictDensity.toFixed(2));
          const mapPriorities = res.data.priorityConflictDensity.forEach((value: IPriorityData) => {
            if (value.prioridadeId == 1) setLow(value.valor.toFixed(1) as any)
            if (value.prioridadeId == 2) setMid(value.valor.toFixed(1) as any)
            if (value.prioridadeId == 3) setHigh(value.valor.toFixed(1) as any)
            if (value.prioridadeId == 4) setCritical(value.valor.toFixed(1) as any)
          })
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, 1000)
  }

  useEffect(() => {
    getMetrics()
  }, [])

  return (
    <CustomBox style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Flex vertical gap={32} align='center'>
        <CustomFlex vertical gap={32}>
          <Flex gap={32}>
            <Flex
              style={{ minWidth: '120px' }}
              justify='center'
            >
              {!loading ? (
                <Progress percent={all} type="dashboard" />
              ) : (
                <Spin size='large' />
              )}
            </Flex>
            <Flex vertical>
              <Flex gap={12} align='center'>
                <Typography.Title>Conflict Density</Typography.Title>
              </Flex>
              <Typography.Paragraph style={{ marginBottom: 0 }}>(Número de Conflitos / (Número Total de
                Derivados + Número Total de Tarefas)) * 100.
              </Typography.Paragraph>
              <Divider />
              {info()}
            </Flex>
          </Flex>
        </CustomFlex>

        <CustomFlex vertical gap={20} align='center'>
          <TypographySub>Por prioridade da ocorrência:</TypographySub>
          {loading ? (
            <Spin size='large' />
          ) : (
            <Flex gap={20}>
              <Flex gap={14}>
                <Progress
                  size={'small'}
                  percent={critical}
                  type="circle"
                  strokeColor={tagColor('Crítica')}
                />
                <Flex vertical justify='center'>
                  <TypographySub>Crítica</TypographySub>
                </Flex>
              </Flex>
              <Flex gap={14}>
                <Progress
                  size={'small'}
                  percent={high}
                  type="circle"
                  strokeColor={'#BE3011'}
                />
                <Flex vertical justify='center'>
                  <TypographySub>Alta</TypographySub>
                </Flex>
              </Flex>
              <Flex gap={14}>
                <Progress
                  size={'small'}
                  percent={mid}
                  type="circle"
                  strokeColor={tagColor('Média')}
                />
                <Flex vertical justify='center'>
                  <TypographySub>Média</TypographySub>
                </Flex>
              </Flex>
              <Flex gap={14}>
                <Progress
                  size={'small'}
                  percent={low}
                  type="circle"
                  strokeColor={tagColor('Baixa')}
                />
                <Flex vertical justify='center'>
                  <TypographySub>Baixa</TypographySub>
                </Flex>
              </Flex>
            </Flex>
          )}
        </CustomFlex>
      </Flex>
    </CustomBox>
  )
}

export default Metrics
