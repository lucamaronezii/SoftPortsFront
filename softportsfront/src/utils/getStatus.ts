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


export const getStatus = (id: number) => {
    switch (id) {
        case 1: return 'Novo';
        case 2: return 'Em análise';
        case 3: return 'Em correção';
        case 4: return 'Em validação';
        case 5: return 'Resolvido';
    }
}