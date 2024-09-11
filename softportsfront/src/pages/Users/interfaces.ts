export interface IUser {
    id: number;
    nome: string;
    password?: string;
    email?: string;
    value?: string;
    cargo?: string;
    keycloakId?: string;
}

export interface IUserCardProps {
    user: IUser,
    onDelete: () => void;
}