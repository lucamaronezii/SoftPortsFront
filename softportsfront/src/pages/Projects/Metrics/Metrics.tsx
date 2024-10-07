import { Divider, Flex, Progress, Tooltip, Typography } from 'antd'
import { CustomBox } from '../styles'
import { CustomFlex, TypographySub } from './styles'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { getPriority, tagColor } from '../../../utils/getPriority'

const Metrics = () => {
  const tooltipInfo = () => {
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

  return (
    <CustomBox style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Flex gap={32} align='center'>
        <CustomFlex vertical gap={32}>
          <Flex gap={32}>
            <Progress percent={63} type="dashboard" />
            <Flex vertical>
              <Flex gap={12} align='center'>
                <Typography.Title>Conflict Density</Typography.Title>
                <Tooltip
                  title={tooltipInfo()}
                  placement='top'
                >
                  <QuestionCircleOutlined style={{ fontSize: 15 }} />
                </Tooltip>
              </Flex>
              <Typography.Paragraph>(Número de Conflitos / (Número Total de
                Derivados + Número Total de Tarefas)) * 100.
              </Typography.Paragraph>
              <Divider />
              {tooltipInfo()}
            </Flex>
          </Flex>
        </CustomFlex>

        <CustomFlex gap={20} align='center'>
          <TypographySub>Por prioridade da ocorrência:</TypographySub>
          <Flex vertical gap={20}>
            <Flex gap={14}>
              <Progress
                size={'small'}
                percent={50}
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
                percent={50}
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
                percent={50}
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
                percent={50}
                type="circle"
                strokeColor={tagColor('Baixa')}
              />
              <Flex vertical justify='center'>
                <TypographySub>Baixa</TypographySub>
              </Flex>
            </Flex>
          </Flex>
        </CustomFlex>
      </Flex>
    </CustomBox>
  )
}

export default Metrics
