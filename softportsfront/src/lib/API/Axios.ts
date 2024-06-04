import axios from "axios"

const dev = 'http://localhost:8090'

export const API = axios.create({
    baseURL: dev,
    headers: {
        'Content-Type': 'application/json'
    }
})
