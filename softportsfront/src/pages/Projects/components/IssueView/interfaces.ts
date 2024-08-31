import { IUser } from "../../../Users/interfaces";
import { IIssue } from "../../interfaces";

export interface IIssueView {
    issueId: number;
    issueTitle: string;
    projectUsers: IUser[];
    open: boolean;
    onClose: (status?: string) => void;
}