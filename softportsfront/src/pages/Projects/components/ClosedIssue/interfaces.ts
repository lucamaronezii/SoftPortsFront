import { IIssue } from "../../interfaces";

export interface IClosedIssue {
    issue: IIssue;
    onClick: () => void;
    onReopen: () => void;
}