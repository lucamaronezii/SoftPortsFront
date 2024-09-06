import { Dispatch, SetStateAction } from "react"
import { IUser } from "../pages/Users/interfaces"

export const getUsersInitials = (usuarios: IUser[], setInitials: Dispatch<string[]>) => {
    const newInitials = usuarios.map(user => {
        const text = user.nome[0] + user.nome[1]
        return text.toUpperCase()
    })
    setInitials(newInitials)
}
