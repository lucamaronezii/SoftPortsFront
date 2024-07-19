import { MapToken } from "antd/es/theme/interface";
import { ComponentsToken } from "antd/es/theme/context";
import { darkerPr } from "../utils/darkerPrimary";

export const prColor = "#1CAE9D"
export const secBgColor = "#252426"

export const token: Partial<MapToken> = {
    borderRadius: 6,
    colorPrimary: prColor,
    colorBgLayout: '#000',
    colorText: '#FFF',
}

export const components: Partial<ComponentsToken> = {
    Input: {
        colorBgContainer: 'transparent',
        colorTextPlaceholder: '#8f8f8f',
        addonBg: prColor
    },
}
