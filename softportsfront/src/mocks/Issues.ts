import { IIssue } from "../pages/Projects/interfaces";
import { usersList } from "./Users";

export const issuesList: IIssue[] = [
    {
        id: 1,
        name: 'Botão desabilitado',
        classification: 'Bug',
        description: 'Botão na tela X está desabilitado e impossibilitando usuário de criar novo usuário',
        priority: 'Crítico',
        responsibles: usersList,
        fixDate: '23/01/2024',
        status: 'Em correção',
    },
    {
        id: 2,
        name: '404 erro',
        classification: 'Bug',
        description: 'Botão na tela X está desabilitado e impossibilitando usuário de criar novo usuário',
        priority: 'Alto',
        responsibles: usersList,
        fixDate: '21/05/2024',
        status: 'Em correção',
    },
    {
        id: 3,
        name: 'Requisição falha',
        classification: 'Bug',
        description: 'Botão na tela X está desabilitado e impossibilitando usuário de criar novo usuário',
        priority: 'Médio',
        responsibles: usersList,
        fixDate: '02/03/2024',
        status: 'Em correção',
    },
    {
        id: 4,
        name: 'Cálculo incorreto',
        classification: 'Bug',
        description: 'Botão na tela X está desabilitado e impossibilitando usuário de criar novo usuário',
        priority: 'Baixo',
        responsibles: usersList,
        fixDate: '11/11/2024',
        status: 'Em correção',
    },
];
