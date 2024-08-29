import { format } from "date-fns"

export const formatDate = (dateString: number) => {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy')
}