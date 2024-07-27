import { IIssue } from "../pages/Projects/interfaces";
import { usersList } from "./Users";

export const issuesList: IIssue[] = [
    {
        id: 1,
        titulo: 'Botão desabilitado',
        classificacoes: [
            {
                classificacaoId: 1,
                nome: "Bug"
            }
        ],
        descricao: 'Botão na tela X está desabilitado e impossibilitando usuário de criar novo usuário',
        prioridade: 'Crítica',
        responsaveis: usersList,
        dataCorrecao: '23/01/2024',
        status: 'Em correção',
    },
    {
        id: 2,
        titulo: '404 erro',
        classificacoes: [
            {
                classificacaoId: 1,
                nome: "Bug"
            }
        ],
        descricao: 'Botão na tela X está desabilitado e impossibilitando usuário de criar novo usuário',
        prioridade: 'Alta',
        responsaveis: usersList,
        dataCorrecao: '21/05/2024',
        status: 'Em correção',
    },
    {
        id: 3,
        titulo: 'Requisição falha',
        classificacoes: [
            {
                classificacaoId: 1,
                nome: "Bug"
            }
        ],
        descricao: 'Botão na tela X está desabilitado e impossibilitando usuário de criar novo usuário',
        prioridade: 'Média',
        responsaveis: usersList,
        dataCorrecao: '02/03/2024',
        status: 'Em correção',
    },
    {
        id: 4,
        titulo: 'Cálculo incorreto',
        classificacoes: [
            {
                classificacaoId: 1,
                nome: "Bug"
            }
        ],
        descricao: 'Botão na tela X está desabilitado e impossibilitando usuário de criar novo usuário',
        prioridade: 'Baixa',
        responsaveis: usersList,
        dataCorrecao: '11/11/2024',
        status: 'Em correção',
    },
];

export const issuesListTest: IIssue[] = [
    {
        id: 4,
        titulo: 'Cálculo incorreto',
        descricao: 'Botão na tela X está desabilitado e impossibilitando usuário de criar novo usuário',
        status: 'Pendente',
        prioridade: 'Baixa',
        classificacoes: [{ classificacaoId: 1, nome: "Bug" }],
        responsaveis: usersList,
        dataCorrecao: '11/11/2024',
        comments: [
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
