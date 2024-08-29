import { IOption } from "../utils/getClass";

export interface IClass {
    label: string;
    value: number;
    children?: IOption[]
}

export const old_classList: IClass[] = [
    {
        label: 'Bug',
        value: 1
    },
    {
        label: 'Pergunta',
        value: 2
    },
    {
        label: 'Melhoria',
        value: 3
    }
]
