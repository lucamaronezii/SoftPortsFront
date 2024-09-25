import { Dispatch, SetStateAction } from "react";
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
    loading: boolean;
    selected: SelectedOptions;
    closed: boolean;
    onSave: () => void;
    onCloseIssue: () => void;
    issue: IIssue;
    created: () => void;
}

export interface IFeedbackModal {
    open: boolean;
    issueId: number;
    onCancel: () => void;
    onSuccess: () => void;
}

export interface ISubPage {
    issue: IIssue;
    logs?: any;
}

export interface LogResponse extends IIssue {
    revision: number;
    revisionType: string;
    tituloModificado: boolean;
    descricaoModificado: boolean;
    soModificado: boolean;
    screenshotsModificado: boolean;
    caminhoModificado: boolean;
    dataFechamentoModificado: boolean;
    dataCriacaoModificado: boolean;
    dataEstimadaModificado: boolean;
    statusModificado: boolean;
    fechadaModificado: boolean;
    posicaoModificado: boolean;
    prioridadeModificado: boolean;
    projetoModificado: boolean;
    feedbackModificado: boolean;
    classificacaoIdModificado: boolean;
    usuariosModificado: boolean;
    classificacaoModificado: boolean;
    customRevisionEntityResponse: {
        id: number;
        revtstmp: number;
        keycloakId: string;
    };
};

export interface MappedLog {
    userId: string;
    message: string;
};