import { useState } from 'react';
import { CustomBox } from '../styles';
import { Table, Input, Flex, Cascader, Button, TableColumnsType } from 'antd';
import { CustomRow } from '../components/IssueView/styles';
import { issueFilterItems } from '../../../utils/issueFilterItems';
import { DataType, matrixData } from '../../../mocks/Matrix';

const columnsMap: TableColumnsType<DataType> = Array.from({ length: 15 }, (_, index) => ({
  title: `Requisito ${index + 1}`,
  dataIndex: `address`,
  key: `${index + 1}`,
  align: "center",
  width: 150,
}));

columnsMap.splice(
  0,
  0,
  {
    title: 'Full Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 180
  },
)

const Matrix = () => {
  const [data, setData] = useState<DataType[]>(matrixData);

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
            options={issueFilterItems}
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
