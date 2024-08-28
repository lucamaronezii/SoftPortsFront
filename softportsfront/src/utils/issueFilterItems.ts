import { priorityItems } from "./getPriority";

export interface Option {
    label: string | React.ReactNode;
    value: string | number;
    children?: Option[];
    disableCheckbox?: boolean;
}

export const issueFilterItems: Option[] = [
    {
        label: 'Responsáveis',
        value: 'respons',
        children: [
            {
                label: 'Eduardo Cidre',
                value: 'cidre',
            },
            {
                label: 'Victor Buchs',
                value: 'buchs',
            },
            {
                label: 'John Doe',
                value: 'doe',
            },
        ]
    },
    {
        label: 'Classificação',
        value: 'class',
        children: [
            {
                label: 'Bug',
                value: 'bug',
            },
            {
                label: 'Pergunta',
                value: 'question'
            },
            {
                label: 'Melhoria',
                value: 'enhancement'
            },
        ],
    },
    ...priorityItems
];