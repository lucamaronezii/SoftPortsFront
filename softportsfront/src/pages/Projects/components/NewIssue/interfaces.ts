export interface INewIssue {
    open: boolean;
    onClose: () => void;
    onOk: (messageApi: any) => void;
    loading: boolean;
}