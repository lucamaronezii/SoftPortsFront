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
    subclassificacaoId: number;
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
    classificacao?: IClassResponse;
    screenshots?: string[];
    caminho?: string;
    dataEstimada: number;
    so?: string;
    projetoId?: number;
    onClick?: () => void;
    columnId?: Id;
    comentarios?: IIssueComment[];
}

export interface IProjectPage {
    users: IUser[]
    loadingUsers: boolean,
}
