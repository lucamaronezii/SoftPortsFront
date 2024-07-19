import { priorityItems } from "./priorityItems";

export interface Option {
    value: string | number;
    label: string | React.ReactNode;
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