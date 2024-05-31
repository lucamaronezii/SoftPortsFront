import { Priority } from "../../components/IssueTag/interfaces";

export interface IStyledItem extends IIssue {
    styled: any;
    ref: any
}

export interface IIssue {
    id: number;
    name: string;
    description: string;
    status: string;
    responsibles: string[];
    priority: Priority;
    classification: string;
}