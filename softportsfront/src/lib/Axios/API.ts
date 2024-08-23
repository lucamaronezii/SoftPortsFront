import axios from "axios"

const devUrl = process.env.REACT_APP_DEVELOPMENT_SERVER

export const API = axios.create({
    baseURL: devUrl,
    headers: {
        'Content-Type': 'application/json',
    }
})
