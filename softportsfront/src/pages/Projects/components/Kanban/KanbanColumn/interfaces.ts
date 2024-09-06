import { ReactNode } from "react";
import { Column } from "./types";
import { IIssue } from "../../../interfaces";

export interface IKanbanColumnProps {
    column: Column;
    children?: ReactNode;
    onClick?: () => void;
    onAddItem?: () => void;
    updateColumn: (id: number, e: string) => void;
    issues: IIssue[];
    deleteIssue: (id: number) => void
    onAdd?: (id?: number) => void;
    onView?: (issue: IIssue) => void;
}