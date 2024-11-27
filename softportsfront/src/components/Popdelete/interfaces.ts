import { PopconfirmProps } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import { ReactNode } from "react";

export interface IPopdelete extends PopconfirmProps {
    children: ReactNode;
    title: string | ReactNode;
    description: string | ReactNode;
    placement?: TooltipPlacement | undefined;
    onConfirm: () => void
    loadingConfirm?: boolean;
}