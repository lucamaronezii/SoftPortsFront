import { IIssue } from "../pages/Projects/interfaces";
import { usersList } from "./Users";

export const issuesList: IIssue[] = [
    {
        id: 1,
        titulo: 'Botão desabilitado',
        classificacao: 1,
        descricao: 'Botão na tela X está desabilitado e impossibilitando usuário de criar novo usuário',
        prioridade: 1,
        usuarios: usersList,
        dataEstimada: 190280938,
        status: 1,
    },
];

export const issuesListTest: IIssue[] = [
    {
        id: 4,
        titulo: 'Cálculo incorreto',
        descricao: 'Botão na tela X está desabilitado e impossibilitando usuário de criar novo usuário',
        status: 1,
        prioridade: 2,
        classificacao: 1,
        usuarios: usersList,
        dataEstimada: 109389028,
        comentarios: [
            {
                username: 'Luis Gonzaga',
                description: 'Descrição do comentário!',
                time: 'há 5 horas',
            },
            {
                username: 'Luis Gonzaga',
                description: 'Descrição do comentário!',
                time: 'há 5 horas',
            },
            {
                username: 'Luis Gonzaga',
                description: 'Descrição do comentário!',
                time: 'há 5 horas',
            },
            {
                username: 'Luis Gonzaga',
                description: 'Descrição do comentário!',
                time: 'há 5 horas',
            },
            {
                username: 'Luis Gonzaga',
                description: 'Descrição do comentário!',
                time: 'há 5 horas',
            },
            {
                username: 'Luis Gonzaga',
                description: 'Descrição do comentário!',
                time: 'há 5 horas',
            },
            {
                username: 'Luis Gonzaga',
                description: 'Descrição do comentário!',
                time: 'há 5 horas',
            },
        ]
    }
]
