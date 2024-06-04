import { MouseEventHandler } from "react";
import { Priority } from "../../components/IssueTag/interfaces";
import { IUser } from "../Users/interfaces";

export interface IStyledItem extends IIssue {
    styled: any;
    ref: any
}

export interface IIssue {
    id: number;
    name: string;
    description: string;
    status: string;
    responsibles: IUser[];
    priority: Priority;
    classification: string;
    onClick?: () => void;
}