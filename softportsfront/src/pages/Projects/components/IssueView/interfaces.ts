import { IIssue } from "../../interfaces";

export interface IIssueView {
    issue: IIssue;
    open: boolean;
    onClose: () => void;
}