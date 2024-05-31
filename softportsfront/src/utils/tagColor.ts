export const tagColor = (priority: string) => {
    switch (priority) {
        case "Baixo":
            return "cyan"
        case "Médio":
            return "yellow"
        case "Alto":
            return "volcano"
        case "Crítico":
            return "red"
    }
}