import React, { useState } from 'react';
import { CustomBox } from '../styles';
import { Table, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  issue: string;
  conflicted: string;
  [key: string]: string;
}

const initialData: DataType[] = [
  {
    key: '1',
    issue: 'Problema 1',
    conflicted: 'New York No. 1 Lake Park',
    req1: 'X', req2: '', req3: 'X', req4: '', req5: '', req6: 'X', req7: ''
  },
  {
    key: '2',
    issue: 'Problema 2',
    conflicted: 'London No. 1 Lake Park',
    req1: '', req2: 'X', req3: '', req4: 'X', req5: '', req6: '', req7: 'X'
  },
  {
    key: '3',
    issue: 'Problema 3',
    conflicted: 'Sydney No. 1 Lake Park',
    req1: 'X', req2: 'X', req3: 'X', req4: 'X', req5: 'X', req6: 'X', req7: 'X'
  },
];

const Matrix = () => {
  const [data, setData] = useState<DataType[]>(initialData);

  const handleCellChange = (value: string, key: string, column: string) => {
    const newData = data.map(item => {
      if (item.key === key) {
        return { ...item, [column]: value };
      }
      return item;
    });
    setData(newData);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Problema',
      dataIndex: 'issue',
      key: 'issue',
    },
    ...Array.from({ length: 7 }, (_, i) => ({
      title: `REQ-${i + 1}`,
      dataIndex: `req${i + 1}`,
      key: `req${i + 1}`,
      render: (text:any, record:any) => (
        <Input
          variant='borderless'
          style={{ textAlign: 'center' }}
          value={record[`req${i + 1}`]}
          onChange={e => handleCellChange(e.target.value, record.key, `req${i + 1}`)}
        />
      ),
    })),
  ];

  return (
    <CustomBox>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
    </CustomBox>
  );
};

export default Matrix;
