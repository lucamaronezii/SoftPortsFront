import dayjs from "dayjs"

export const formatUnix = (unix: number) => {
    return dayjs.unix(unix / 1000).format('DD/MM/YYYY')
}