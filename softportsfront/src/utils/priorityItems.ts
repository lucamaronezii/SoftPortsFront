import { Option } from "./issueFilterItems";

export const priorityItems: Option[] = [
    {
        label: 'Prioridade',
        value: 'priority',
        children: [
            {
                label: 'Crítica',
                value: 'Crítica'
            },
            {
                label: 'Alta',
                value: 'Alta'
            },
            {
                label: 'Média',
                value: 'Média'
            },
            {
                label: 'Baixa',
                value: 'Baixa'
            },
        ]
    },
]