import dayjs from "dayjs"
import { format } from "date-fns"

export const formatUnix = (unix: number) => {
    return dayjs.unix(unix / 1000).format('DD/MM/YYYY')
}


export const formatDate = (dateString: number) => {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy')
}