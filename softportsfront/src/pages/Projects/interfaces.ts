import { Priority } from "../../components/IssueTag/interfaces";
import { Id } from "./components/Kanban/KanbanColumn/types";
import { ITestCase } from "./TestCases/interfaces";

export interface IStyledItem extends IIssue {
    styled: any;
    ref: any
}

export interface IClassification {
    classificacaoId: number;
    nome: string;
}

export interface IUserTestess {
    usuarioId: number,
    nome: string,
    cargo: string
}

export interface IIssue {
    id: number;
    titulo: string;
    descricao: string;
    status: string;
    responsaveis: IUserTestess[];
    prioridade: Priority;
    classificacoes: IClassification[];
    screenshot?: string;
    caminho?: string;
    casosDeTestes?: ITestCase[];
    dataCorrecao: string;
    versaoSO?: string;
    onClick?: () => void;
    columnId?: Id;
}