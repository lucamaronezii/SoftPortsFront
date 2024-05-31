import { Option } from "./cascaderItems";

export const priorityItems: Option[] = [
    {
        label: 'Prioridade',
        value: 'priority',
        children: [
            {
                label: 'Crítico',
                value: 'crit'
            },
            {
                label: 'Alto',
                value: 'big'
            },
            {
                label: 'Médio',
                value: 'mid'
            },
            {
                label: 'Baixo',
                value: 'low'
            },
        ]
    },
]