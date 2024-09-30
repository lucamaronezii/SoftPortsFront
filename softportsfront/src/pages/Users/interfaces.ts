export interface IUser {
    id: number;
    nome: string;
    password?: string;
    email?: string;
    value?: string;
    roles?: string[];
    keycloakId?: string;
    foto?: string;
}

export interface IUserCardProps {
    user: IUser,
    onDelete: () => void;
}