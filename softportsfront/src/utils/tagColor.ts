export const tagColor = (priority: string) => {
    switch (priority) {
        case "Baixa":
            return "cyan"
        case "Média":
            return "yellow"
        case "Alta":
            return "volcano"
        case "Crítica":
            return "red"
    }
}