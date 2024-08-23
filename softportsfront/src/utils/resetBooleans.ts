import { Dispatch, SetStateAction } from "react";

export const resetBooleans = (state: Record<string, boolean>, setState: Dispatch<SetStateAction<Record<string, boolean>>>) => {
    const updatedState = Object.keys(state).reduce((acc, key) => {
        acc[key] = false;
        return acc;
    }, {} as Record<string, boolean>);

    setState(updatedState);
};
