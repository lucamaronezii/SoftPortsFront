import { IIssue } from "../../../interfaces";

export interface IKanbanCard {
    issue: IIssue;
    deleteIssue: (id: number) => void;
    onView?: (issue: IIssue) => void;
}