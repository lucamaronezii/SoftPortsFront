import { IUser } from "../pages/Users/interfaces";

export interface IOption {
    label: string;
    value?: number | string;
    children?: IOption[] | IUser[]
}

const categories: IOption[] = [
    {
        label: 'Funcional',
        value: 6,
    },
    {
        label: 'Desempenho',
        value: 7,
    },
    {
        label: 'Segurança',
        value: 8,
    },
    {
        label: 'Integração',
        value: 9,
    },
    {
        label: 'Outro',
        value: 14,
    },
]

export const classList: IOption[] = [
    {
        value: 0,
        label: 'Classificação',
        children: [
            {
                value: 1,
                label: 'Incidente',
                children: [
                    ...categories
                ]
            },
            {
                value: 5,
                label: 'Problema',
                children: [
                    ...categories
                ]
            },
            {
                value: 10,
                label: 'Mudança',
                children: [
                    {
                        label: 'Normal',
                        value: 12
                    },
                    {
                        label: 'Emergencial',
                        value: 13
                    }
                ]
            }
        ]
    }
]