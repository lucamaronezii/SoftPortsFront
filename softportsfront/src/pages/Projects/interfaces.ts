import { Priority } from "../../components/IssueTag/interfaces";
import { IUser } from "../Users/interfaces";
import { ITestCase } from "./TestCases/interfaces";

export interface IStyledItem extends IIssue {
    styled: any;
    ref: any
}

export interface IClassification {
    classificacaoId: number;
    nome: string;
}

export interface IUserTestesssssssssssssssssss {
    usuarioId: number,
    nome: string,
    cargo: string
}

export interface IIssue {
    id: number;
    titulo: string;
    descricao: string;
    status: string;
    responsaveis: IUserTestesssssssssssssssssss[];
    prioridade: Priority;
    classificacoes: IClassification[];
    screenshot?: string;
    caminho?: string;
    casosDeTeste?: ITestCase[];
    dataCorrecao: string;
    onClick?: () => void;
}