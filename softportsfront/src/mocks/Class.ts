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
        value: 'Bug',
        children: [
            {
                label: 'Funcional',
                value: 'bug_func',
            },
            {
                label: 'Lógico',
                value: 'bug_integ',
            },
            {
                label: 'Segurança',
                value: 'bug_seg',
            },
            {
                label: 'Interface',
                value: 'bug_int',
            },
            {
                label: 'Multi-threading',
                value: 'bug_thr',
            },
            {
                label: 'Sintaxe',
                value: 'bug_sin',
            },
        ],
    },
    {
        id: 4,
        label: 'Pergunta',
        value: 'Pergunta'
    },
    {
        id: 5,
        label: 'Melhoria',
        value: 'Melhoria'
    }
]
