import { IUser } from "../../../Users/interfaces";

export interface INewIssue {
    open: boolean;
    onClose: () => void;
    onOk: (status: string) => void;
    selectedKanban?: number | undefined;
    projectUsers: IUser[]
}