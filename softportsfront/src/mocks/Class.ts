interface IClass {
    label: string;
    value: number;
    children?: IOption[]
}

interface IOption {
    label: string;
    value?: number;
}

export const old_classList: IClass[] = [
    {
        label: 'Bug',
        value: 1
    },
    {
        label: 'Pergunta',
        value: 2
    },
    {
        label: 'Melhoria',
        value: 3
    }
]

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
        value: 15,
    },
]

export const classList: IClass[] = [
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
