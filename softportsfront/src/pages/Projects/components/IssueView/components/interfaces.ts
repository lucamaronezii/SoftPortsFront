import { Dispatch } from "react";
import { IIssue } from "../../../interfaces";

export interface IIssueDetails {
    issue: IIssue;
    onClose: (type: string) => void;
    isEditing: boolean;
    setIsEditing: Dispatch<React.SetStateAction<boolean>>
    onUpdate: (issue: any) => void;
}