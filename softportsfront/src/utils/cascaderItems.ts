import { priorityItems } from "./priorityItems";

export interface Option {
    value: string | number;
    label: string;
    children?: Option[];
    disableCheckbox?: boolean;
}

export const cascaderItems: Option[] = [
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