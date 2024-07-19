import { ReactNode } from "react";

export interface IPopdelete {
    children: ReactNode;
    title: string | ReactNode;
    description: string | ReactNode;
    onConfirm: () => void
}