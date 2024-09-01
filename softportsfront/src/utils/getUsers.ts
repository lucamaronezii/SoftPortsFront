import { IUser } from "../pages/Users/interfaces";
import { IOption } from "./getClass";

export const manipulateUsers = (users: IUser[]): IOption => {
    const mappedUsers = users.map(user => ({
        label: user.nome,
        value: user.id.toString()
    }));

    return {
        label: 'Responsáveis',
        value: 'users',
        disabled: !mappedUsers.length,
        children: mappedUsers
    }
}
