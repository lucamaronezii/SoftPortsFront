import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Flex, Input, message, Segmented, Spin, Table, Typography } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useEffect, useState } from 'react';
import emptySvg from '../../../assets/empty-table.svg';
import { useAxios } from '../../../auth/useAxios';
import Popdelete from '../../../components/Popdelete/Popdelete';
import useProjects from '../../../hooks/useProjects';
import { plcColor } from '../../../styles/theme';
import { CustomRow } from '../components/IssueView/styles';
import { NoIssuesBox } from '../OpenIssues/styles';
import { CustomBox } from '../styles';
import DerivativeModal from './components/DerivativeModal';

const Matrix = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loadingDv, setLoadingDv] = useState<boolean>(true)
  const [messageApi, contextHolder] = message.useMessage()
  const [derivatives, setDerivatives] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [conflicts, setConflicts] = useState<any[]>([]);
  const [tamanho, setTamanho] = useState<SizeType>('large');
  const { selectedProject } = useProjects()
  const axios = useAxios()

  const columns = [
    {
      title: 'Ocorrência/Derivado',
      dataIndex: 'issueName',
      key: 'issueName',
      fixed: 'left' as const,
      width: 180,
    },
    ...derivatives.map((derivative) => ({
      title:
        <Flex gap={10}>
          {derivative.nome}
          <Popdelete
            title="Excluir derivado"
            description="Tem certeza que deseja excluir este derivado?"
            onConfirm={() => handleDeleteDerivative(derivative.id)}
          >
            <DeleteOutlined style={{ color: plcColor, marginLeft: 8 }} />
          </Popdelete>
        </Flex>
      ,
      dataIndex: `derivado_${derivative.id}`,
      key: `derivado_${derivative.id}`,
      align: 'center' as const,
      width: 150,
      render: (_: any, record: any) => (
        <Checkbox
          checked={record[`derivado_${derivative.id}`]}
          onChange={handleCheckboxChange(record.issueId, derivative.id)}
        />
      ),
    })),
  ];

  const handleDeleteDerivative = async (derivativeId: number) => {
    try {
      await axios.delete(`/derivado/${derivativeId}`);
      messageApi.success('Derivado excluído com sucesso');
      fetchDerivatives();
    } catch (error) {
      messageApi.error('Erro ao excluir derivado');
    }
  };

  const prepareTableData = () => {
    return issues.map((issue) => {
      const rowData: any = {
        key: issue.id,
        issueId: issue.id,
        issueName: issue.titulo,
      };

      derivatives.forEach((derivative) => {
        const conflict = conflicts.find(
          (c) =>
            c.derivadoResponse.id === derivative.id &&
            c.tarefaResponse.id === issue.id
        );
        rowData[`derivado_${derivative.id}`] = conflict ? conflict.valor : false;
      });

      return rowData;
    });
  };

  const dataSource = prepareTableData();

  const handleCheckboxChange = (issueId: number, derivativeId: number) => async (e: any) => {
    const valor = e.target.checked;

    try {
      await axios.post('/derivado/matriz', {
        derivadoId: derivativeId,
        tarefaId: issueId,
        valor,
        projetoId: selectedProject.id,
      });

      fetchConflicts();
    } catch (error) {
      messageApi.error('Erro ao atualizar o conflito.');
    }
  };


  const onSuccess = () => {
    messageApi.success('Lista de derivados atualizada com sucesso.')
    setOpenModal(false)
    fetchDerivatives()
  }

  const fetchDerivatives = async () => {
    setLoadingDv(true)
    try {
      const response = await axios.get(`/derivado?tamanhoPagina=1000&projetoId=${selectedProject.id}`);
      setDerivatives(response.data.conteudo);
    } catch (error) {
      messageApi.error('Erro ao buscar derivados.');
    }
    setLoadingDv(false)
  };

  const fetchIssues = async () => {
    try {
      const response = await axios.get(`/tarefa?tamanhoPagina=1000&projetoId=${selectedProject.id}&fechada=false`);
      setIssues(response.data.conteudo);
    } catch (error) {
      messageApi.error('Erro ao buscar issues.');
    }
  };

  const fetchConflicts = async () => {
    try {
      const response = await axios.get(`/derivado/matriz?tamanhoPagina=1000&projetoId=${selectedProject.id}`);
      setConflicts(response.data.conteudo);
    } catch (error) {
      messageApi.error('Erro ao buscar conflitos.');
    }
  };

  useEffect(() => {
    if (selectedProject.id) {
      fetchDerivatives();
      fetchIssues();
      fetchConflicts();
    }
  }, [selectedProject.id]);

  return (
    <>
      {contextHolder}
      <CustomBox>
        <CustomRow justify={'space-between'}>
          <Flex gap={15}>
            <div style={{ maxWidth: '300px' }}>
              <Input.Search
                placeholder='Pesquisar registro'
                allowClear
                enterButton
              />
            </div>
            <Cascader
              removeIcon
              placeholder='Filtrar registros'
              multiple
              maxTagCount={'responsive'}
            />
            <Segmented
              options={[
                {
                  value: 'large',
                  label: 'Grande'
                },
                {
                  value: 'middle',
                  label: 'Médio'
                },
                {
                  value: 'small',
                  label: 'Pequeno'
                },
              ]}
              onChange={(e) => setTamanho(e as SizeType)}
            />
          </Flex>
          <Flex gap={8}>
            <Button onClick={() => setOpenModal(true)} type='primary' icon={<PlusOutlined />}>
              Novo derivado
            </Button>
          </Flex>
        </CustomRow>

        {!loadingDv && !derivatives.length ? (
          <>
            <NoIssuesBox>
              <img src={emptySvg} width={500} />
              <Typography.Title level={4}>
                Nenhum derivado cadastrado. Cadastre derivados para visualizar a matriz
              </Typography.Title>
            </NoIssuesBox>
          </>
        ) : loadingDv ? (
          <Flex align='center' justify='center' style={{ flexGrow: 1 }}>
            <Spin size='large' />
          </Flex>
        ) : (
          <div style={{ position: 'relative', overflowX: 'auto', overflowY: 'auto', height: '100%' }}>
            <div style={{ position: 'absolute' }}>
              <Table
                size={tamanho}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            </div>
          </div>
        )}

        <DerivativeModal
          derivatives={derivatives && derivatives}
          open={openModal}
          onClose={() => setOpenModal(false)}
          onCreated={onSuccess}
        />
      </CustomBox>
    </>
  );
};

export default Matrix;
