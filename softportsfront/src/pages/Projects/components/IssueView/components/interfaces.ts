import { Dispatch } from "react";
import { IIssue } from "../../../interfaces";

export type SelectedOptions = 'details' | 'comments' | 'logs'

export interface IIssueDetails {
    issue: IIssue;
    onClose: (type: string) => void;
    isEditing: boolean;
    setIsEditing: Dispatch<React.SetStateAction<boolean>>
    onUpdate: (issue: any) => void;
}

export interface IModalFooter {
    onSave: () => void;
    selected: SelectedOptions
}