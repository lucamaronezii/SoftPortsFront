import { API } from "../lib/Axios/API";

export const getIssues = () => {
    return API.get('/tarefa')
}

export const createIssue = (body: Object) => {
    return API.post('/tarefa', body)
}