import { UniqueIdentifier } from "@dnd-kit/core";
import { ReactNode } from "react";

export interface IKanbanColumnProps {
    id?: UniqueIdentifier;
    children?: ReactNode;
    title?: string;
    onClick?: () => void;
    onAddItem?: () => void;
}