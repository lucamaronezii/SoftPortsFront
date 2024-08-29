import { API } from "../lib/Axios/API";

export const getAllProjects = () => {
    return API.get('/projeto')
}