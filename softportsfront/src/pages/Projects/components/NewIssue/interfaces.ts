export interface INewIssue {
    open: boolean;
    onClose: () => void;
    onOk: (status: string) => void;
}