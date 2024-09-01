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
    dataCriacao?: number;
    dataFechamento?: number;
    dataEstimada: number;
    classificacao?: IClassResponse;
    screenshots?: string[];
    fechada?: boolean;
    caminho?: string;
    feedback?: string;
    so?: string;
    projetoId?: number;
    onClick?: () => void;
    onReopen?: () => void;
    columnId?: Id;
    comentarios?: IIssueComment[];
}

export interface IProjectPage {
    users: IUser[]
    loadingUsers: boolean,
}
