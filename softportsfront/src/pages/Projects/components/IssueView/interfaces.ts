export interface IIssueView {
    issueId: number;
    open: boolean;
    onClose: () => void;
}