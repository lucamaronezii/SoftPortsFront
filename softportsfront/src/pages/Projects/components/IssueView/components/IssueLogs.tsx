import { Timeline } from 'antd'
import { SectionFlex } from './styles'
import { formatUnix } from '../../../../../utils/handleDate'
import { ISubPage, LogResponse, MappedLog } from './interfaces'
import { TimelineItemProps } from 'antd/lib'
import { errColor } from '../../../../../styles/theme'
import { ReactNode } from 'react'
import { getStatus } from '../../../../../utils/getStatus'
import { getPriority } from '../../../../../utils/getPriority'

const mapLogToMessage = (log: LogResponse): MappedLog => {
  const { nome: keycloakId } = log.customRevisionEntityResponse;
  let changes: string[] = [];

  if (log.tituloModificado) changes.push(`título para "${log.titulo}"`);
  if (log.descricaoModificado) changes.push(`descrição para "${log.descricao}"`);
  if (log.soModificado) changes.push(`sistema operacional para "${log.so}"`);
  if (log.screenshotsModificado) changes.push(`screenshots alteradas`);
  if (log.caminhoModificado) changes.push(`caminho para "${log.caminho}"`);
  if (log.dataFechamentoModificado && log.dataFechamento) changes.push(`data de fechamento para ${new Date(log.dataFechamento).toLocaleDateString()}`);
  if (log.dataEstimadaModificado) changes.push(`data estimada para correção para ${new Date(log.dataEstimada).toLocaleDateString()}`);
  if (log.statusModificado) changes.push(`status para "${getStatus(log.status)}"`);
  if (log.fechadaModificado) changes.push(`ocorrência ${log.fechada ? 'fechada' : 'aberta'}`);
  if (log.prioridadeModificado) changes.push(`prioridade para "${getPriority(log.prioridade)}"`);
  // if (log.projetoModificado) changes.push(`projeto para "${log.projetoId}"`);
  if (log.feedbackModificado) changes.push(`feedback alterado`);
  if (log.classificacaoIdModificado) changes.push(`classificação alterada`);
  // if (log.usuariosModificado) changes.push(`usuários modificados`);

  const message = changes.length > 0
    ? `Usuário ${keycloakId} alterou ${changes.join("; ")}.`
    : `Usuário ${keycloakId} não fez alterações.`;

  return {
    userId: keycloakId,
    message,
  };
};

const mapLogs = (logs: LogResponse[]): MappedLog[] => {
  return logs.map(log => mapLogToMessage(log));
};

const IssueLogs: React.FC<ISubPage> = ({ issue, logs }) => {

  const mappedLogs = mapLogs(logs.conteudo);

  const mapItems = mappedLogs.map(value => {
    const list: TimelineItemProps[] = []
    list.push({ children: value.message })
    return list
  })

  let items: TimelineItemProps[] | undefined = [
    {
      children: `Ocorrência criada em ${formatUnix(issue.dataCriacao!)}`
    },
    ...mapItems.flat(),
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
