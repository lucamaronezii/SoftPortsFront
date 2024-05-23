import React from "react";

export interface ISidebarItemProps {
    to: string;
    text: string;
    selected?: boolean;
    icFilled: React.ReactNode;
    icOutlined: React.ReactNode;
    hasChild?: boolean;
}