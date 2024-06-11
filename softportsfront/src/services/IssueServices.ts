import { API } from "../lib/Axios/API";

export const getIssues = () => {
    return API.get('/tarefa')
}