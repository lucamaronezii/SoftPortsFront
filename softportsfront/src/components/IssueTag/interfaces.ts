export type Priority = "Crítico" | "Alto" | "Médio" | "Baixo"

export interface IIssueTag {
    priority: Priority;
    children: React.ReactNode
}