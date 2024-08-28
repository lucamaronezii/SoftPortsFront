import { classList, IOption } from "./getClass";
import { priorityItems } from "./getPriority";

export const issueFilterItems: (IOption[]) = [
    ...classList,
    ...priorityItems
];