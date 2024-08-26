interface IStatus {
    id: number;
    title: string;
}

export const statusList: IStatus[] = [
    {
        id: 1,
        title: 'Novo'
    },
    {
        id: 2,
        title: 'Em análise'
    },
    {
        id: 3,
        title: 'Em correção'
    },
    {
        id: 4,
        title: 'Em validação'
    },
    {
        id: 5,
        title: 'Resolvido'
    }
]
