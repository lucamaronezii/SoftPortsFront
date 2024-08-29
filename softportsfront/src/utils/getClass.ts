import { IUser } from "../pages/Users/interfaces";

export interface IOption {
    label: string;
    value?: number | string;
    children?: IOption[] | IUser[]
}

const categories: IOption[] = [
    {
        label: 'Funcional',
        value: 4,
    },
    {
        label: 'Desempenho',
        value: 5,
    },
    {
        label: 'Segurança',
        value: 6,
    },
    {
        label: 'Integração',
        value: 7,
    },
    {
        label: 'Outro',
        value: 8,
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
                value: 2,
                label: 'Problema',
                children: [
                    ...categories
                ]
            },
            {
                value: 3,
                label: 'Mudança',
                children: [
                    {
                        label: 'Normal',
                        value: 9
                    },
                    {
                        label: 'Emergencial',
                        value: 10
                    }
                ]
            }
        ]
    }
]

export const getClass = (id: number) => {
    switch (id) {
        case 1: return 'Incidente';
        case 2: return 'Problema';
        case 3: return 'Mudança';
        case 4: return 'Funcional';
        case 5: return 'Desempenho';
        case 6: return 'Segurança';
        case 7: return 'Integração';
        case 8: return 'Outro';
        case 9: return 'Normal';
        case 10: return 'Emergencial';
    }
}