import { Timeline } from 'antd'
import { SectionFlex } from './styles'
import { formatUnix } from '../../../../../utils/handleDate'
import { ISubPage } from './interfaces'
import { TimelineItemProps } from 'antd/lib'
import { errColor } from '../../../../../styles/theme'

const IssueLogs: React.FC<ISubPage> = ({ issue }) => {
  let items: TimelineItemProps[] | undefined = [
    {
      children: `Ocorrência criada em ${formatUnix(issue.dataCriacao!)}`
    },
    ...(issue.fechada ?
      [{ children: `Ocorrência fechada em ${formatUnix(issue.dataFechamento!)}`, color: errColor }]
      : [])
  ]

  return (
    <SectionFlex align='center'>
      <Timeline
        style={{ marginTop: 10 }}
        items={items}
      />
    </SectionFlex>
  )
}

export default IssueLogs
