import { SelectProps } from "antd";
import { ReactNode } from "react";

export interface ITitleSelect extends SelectProps {
    text: string;
    removeIcon?: boolean;
    tooltip?: string | ReactNode;
}