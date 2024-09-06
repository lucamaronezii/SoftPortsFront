import dayjs from "dayjs"
import { format } from "date-fns"

export const formatUnix = (unix: number) => {
    return dayjs.unix(unix / 1000).format('DD/MM/YYYY')
}


export const formatDate = (dateString: number) => {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy')
}


export const handleCommentDate = (creationDate: number[]) => {
    const [ano, mes, dia, hora, minuto, segundo, nanosegundos] = creationDate
    const date = new Date(ano, mes - 1, dia, hora, minuto, segundo, nanosegundos / 1e6)
    const now = new Date()
    const diferencaMs = now.getTime() - date.getTime();
    const diferencaSegundos = Math.floor(diferencaMs / 1000);
    const diferencaDias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));
    const diferencaHoras = Math.floor(diferencaMs / (1000 * 60 * 60));
    const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));
    const diferencaMeses = Math.floor(diferencaDias / 30);
    if (diferencaDias >= 30) {
        return `${diferencaMeses} mes(es) atrás`;
    } else if (diferencaDias >= 1) {
        return `${diferencaDias} dia(s) atrás`;
    } else if (diferencaHoras >= 1) {
        return `${diferencaHoras} hora(s) atrás`;
    } else if (diferencaMinutos >= 1) {
        return `${diferencaMinutos} minuto(s) atrás`;
    } else {
        return `${diferencaSegundos} segundo(s) atrás`;
    }
}