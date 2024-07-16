import { IIssue } from "../../interfaces";

export interface IIssueView {
    issue: IIssue;
    open: boolean;
    onClose: (status?: string) => void;
}