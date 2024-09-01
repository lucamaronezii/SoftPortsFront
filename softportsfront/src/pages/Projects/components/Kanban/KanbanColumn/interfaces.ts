import { ReactNode } from "react";
import { Column, Id } from "./types";
import { IIssue } from "../../../interfaces";

export interface IKanbanColumnProps {
    column: Column;
    children?: ReactNode;
    onClick?: () => void;
    onAddItem?: () => void;
    onRemoveColumn?: () => void;
    updateColumn: (id: Id, e: string) => void;
    addIssue: (id: Id) => void;
    issues: IIssue[];
    deleteIssue: (id: Id) => void
    onAdd?: (id?: number) => void;
}