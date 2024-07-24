import { Checkbox } from "antd";

export interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string | React.ReactNode;
}

export const matrixData: DataType[] = [
    {
        key: '1',
        name: 'Problema',
        age: 32,
        address: <Checkbox />,
    },
    {
        key: '2',
        name: 'Problema 1',
        age: 40,
        address: <Checkbox />,
    },
    {
        key: '3',
        name: 'Problema 2',
        age: 40,
        address: <Checkbox />,
    },
    {
        key: '4',
        name: 'Problema 3',
        age: 40,
        address: <Checkbox />,
    },
    {
        key: '5',
        name: 'Problema',
        age: 40,
        address: <Checkbox />,
    },
    {
        key: '6',
        name: 'Problema',
        age: 40,
        address: <Checkbox />,
    },
    {
        key: '7',
        name: 'Problema',
        age: 40,
        address: <Checkbox />,
    },
    {
        key: '8',
        name: 'Problema',
        age: 40,
        address: <Checkbox />,
    },
    {
        key: '9',
        name: 'Problema',
        age: 40,
        address: <Checkbox />,
    },
    {
        key: '10',
        name: 'Problema X',
        age: 40,
        address: <Checkbox />,
    },
    {
        key: '11',
        name: 'Problema Y',
        age: 40,
        address: <Checkbox />,
    },
    {
        key: '12',
        name: 'Problema Z',
        age: 40,
        address: <Checkbox />,
    },
];