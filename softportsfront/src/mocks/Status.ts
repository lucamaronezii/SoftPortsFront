interface IStatus {
    id: number;
    value: string;
}

export const statusList: IStatus[] = [
    {
        id: 1,
        value: 'Pendente'
    },
    {
        id: 1,
        value: 'Em correção'
    },
    {
        id: 1,
        value: 'Testes'
    },
    {
        id: 1,
        value: 'Aguardando aprovação'
    }
]