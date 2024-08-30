import { IIssue } from "../../interfaces";

export interface IIssueView {
    issueId: number;
    issueTitle: string;
    open: boolean;
    onClose: (status?: string) => void;
}