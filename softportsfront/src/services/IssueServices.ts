import { API } from "../lib/Axios/API";

export const getIssues = () => {
    return API.get('/tarefa')
}

export const createIssue = (body: Object) => {
    return API.post('/tarefa', body)
}

export const deleteIssue = (id: number) => {
    return API.delete(`/tarefa/${id}`)
}

export const editIssue = (id: number, body: Object) => {
    return API.put(`/tarefa/${id}`, body)
}