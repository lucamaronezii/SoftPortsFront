import { Id } from "./components/Kanban/KanbanColumn/types";

export interface IStyledItem extends IIssue {
    styled: any;
    ref: any
}

export interface IUserTestess {
    usuarioId: number,
    nome: string,
    cargo: string
}

export interface IIssueComment {
    photo?: string;
    username: string;
    time: string;
    description: string;
}

export interface IIssue {
    id: number;
    titulo: string;
    descricao: string;
    status: number;
    usuarios: IUserTestess[];
    prioridade: number;
    classificacao: number;
    screenshots?: string[];
    caminho?: string;
    dataEstimada: number;
    versaoSO?: string;
    onClick?: () => void;
    columnId?: Id;
    comentarios?: IIssueComment[];
}