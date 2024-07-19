interface IClass {
    id: number;
    label: string;
    value: string;
    children?: IOption[]
}

interface IOption {
    label: string;
    value: string;
}

export const classList: IClass[] = [
    {
        id: 1,
        label: 'Bug',
        value: 'Bug'
    },
    {
        id: 2,
        label: 'Pergunta',
        value: 'Pergunta'
    },
    {
        id: 3,
        label: 'Melhoria',
        value: 'Melhoria'
    }
]
