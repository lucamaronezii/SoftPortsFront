import React from "react";
import { IProject } from "../../layouts/interfaces";

export interface ISidebarItemProps {
    to?: string;
    text: string;
    selected?: boolean;
    icFilled: React.ReactNode;
    icOutlined: React.ReactNode;
    hasChild?: boolean;
    dropOpen?: boolean;
    selProject?: number;
    idProject?: number;
    onLogout?: () => void;
    projects?: IProject[];
    loadingPjts?: boolean;
    location?: string;
}