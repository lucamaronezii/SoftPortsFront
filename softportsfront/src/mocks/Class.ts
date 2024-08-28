export interface IClass {
    label: string;
    value: number;
    children?: IOption[]
}

export interface IOption {
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
