export type Priority = "Crítica" | "Alta" | "Média" | "Baixa"

export interface IIssueTag {
    priority: Priority;
    children: React.ReactNode
}