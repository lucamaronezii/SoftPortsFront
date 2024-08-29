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

export interface IIssue {
    id: number;
    titulo: string;
    descricao: string;
    status: number;
    usuarios: IUser[];
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

export interface IProjectPage {
    loadingUsers: boolean,
    users: IUser[]
}
