export interface IStyledItem extends IIssue {
    styled: any;
    ref: any
}

export interface IIssue {
    id: number;
    name: string;
    description: string;
    status: string;
    responsibles: string[];
    priority: string;
    classification: string;
}