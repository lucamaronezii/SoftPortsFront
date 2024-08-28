import { Option } from "./issueFilterItems";

export const priorityItems: Option[] = [
    {
        label: 'Prioridade',
        value: 'priority',
        children: [
            {
                label: 'Crítica',
                value: 4
            },
            {
                label: 'Alta',
                value: 3
            },
            {
                label: 'Média',
                value: 2
            },
            {
                label: 'Baixa',
                value: 1
            },
        ]
    },
]

export const getPriority = (id: number) => {
    switch (id) {
        case 1: return 'Baixa';
        case 2: return 'Média';
        case 3: return 'Alta';
        case 4: return 'Crítica';
    }
}

export const tagColor = (priority: string) => {
    switch (priority) {
        case 'Baixa':
            return "cyan"
        case 'Média':
            return "yellow"
        case 'Alta':
            return "volcano"
        case 'Crítica':
            return "red"
    }
}