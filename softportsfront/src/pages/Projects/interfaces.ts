import { IUser } from "../Users/interfaces";
import { Id } from "./components/Kanban/KanbanColumn/types";

export interface IStyledItem extends IIssue {
    styled: any;
    ref: any
}

export interface IIssueComment {
    photo?: string;
    username: string;
    time: string;
    description: string;
}

export interface IClassResponse {
    id: number,
    nome: string;
}

export interface IShortIssue {
    id: number;
    titulo: string;
}

export interface IIssue {
    id: number;
    titulo: string;
    descricao: string;
    status: number;
    usuarios: IUser[];
    prioridade: number;
    dataFechamento?: number;
    classificacoes?: IClassResponse[];
    screenshots?: string[];
    caminho?: string;
    dataEstimada: number;
    so?: string;
    onClick?: () => void;
    columnId?: Id;
    comentarios?: IIssueComment[];
}

export interface IProjectPage {
    users: IUser[]
    loadingUsers: boolean,
}
