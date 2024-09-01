import { TooltipPlacement } from "antd/es/tooltip";
import { ReactNode } from "react";

export interface IPopdelete {
    children: ReactNode;
    title: string | ReactNode;
    description: string | ReactNode;
    placement?: TooltipPlacement | undefined;
    onConfirm: () => void
}