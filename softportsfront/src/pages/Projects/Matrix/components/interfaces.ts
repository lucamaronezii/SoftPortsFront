export interface IDerivativeModal {
    open: boolean; 
    onClose: () => void;
    onCreated: () => void;
    derivatives: any[];
}