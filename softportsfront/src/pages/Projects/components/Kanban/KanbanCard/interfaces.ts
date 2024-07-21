import { IIssue } from "../../../interfaces";
import { Id } from "../KanbanColumn/types";

export interface IKanbanCard {
    issue: IIssue;
    deleteIssue: (id: Id) => void;
}