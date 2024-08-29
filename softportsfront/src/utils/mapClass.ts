import { IClassResponse } from "../pages/Projects/interfaces"
import { getClass } from "./getClass"

export const mapClass = (objt: IClassResponse[]) => {
    let classArray: any[] = []
    objt.map(value => {
        const name = getClass(value.id)
        classArray.push(name)
    })
    classArray.splice(1, 0, ' / ')
    return classArray
}