import { Button, Cascader, Checkbox, Flex, Input, Table } from 'antd';
import { useState } from 'react';
import { derivativesData, matrixData } from '../../../mocks/Matrix';
import { CustomRow } from '../components/IssueView/styles';
import { CustomBox } from '../styles';

const Matrix = () => {
  const [data, setData] = useState(matrixData);

  // Função para lidar com a mudança de estado da checkbox
  const handleCheckboxChange = (problemId: React.Key, derivativeId: number) => (e: any) => {
    const checked = e.target.checked;

    // Atualiza o estado local
    setData(prevData => prevData.map(item => {
      if (item.key === problemId) {
        return { ...item, [`requisito${derivativeId}`]: checked };
      }
      return item;
    }));

    // Loga no console os IDs
    console.log(`Derivative ID: ${derivativeId}, Problem ID: ${problemId}`);
  };

  const columnsMap: any = derivativesData.map((derivative) => ({
    title: derivative.name,
    dataIndex: `requisito${derivative.id}`, // Use um dataIndex único para cada derivado
    key: `requisito${derivative.id}`,
    align: "center",
    width: 150,
    render: (_: any, record: any) => (
      <Checkbox
        checked={record[`requisito${derivative.id}`]}
        onChange={handleCheckboxChange(record.key, derivative.id)}
      />
    ),
  }));

  columnsMap.splice(
    0,
    0,
    {
      title: 'Issue',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left' as const,
      width: 180
    },
  );

  return (
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
        </Flex>
        <Flex gap={8}>
          <Button type='primary'>
            Salvar
          </Button>
        </Flex>
      </CustomRow>
      <div style={{ position: 'relative', overflowX: 'auto', overflowY: 'auto', height: '100%' }}>
        <div style={{ position: 'absolute' }}>
          <Table
            columns={columnsMap}
            dataSource={data}
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </div>
    </CustomBox>
  );
};

export default Matrix;
