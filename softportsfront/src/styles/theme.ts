import { MapToken } from "antd/es/theme/interface";
import { ComponentsToken } from "antd/es/theme/context";

export const prColor = "#1CAE9D"
export const secBgColor = "#252426"

export const token: Partial<MapToken> = {
    borderRadius: 6,
    colorPrimary: prColor,
    colorBgLayout: '#000',
    colorText: '#FFF',
    colorError: '#FB223B'
}

export const components: Partial<ComponentsToken> = {
    Input: {
        colorBgContainer: 'transparent',
        colorTextPlaceholder: '#8f8f8f',
        addonBg: prColor,
    },
    Menu: {
        itemColor: '#FFF',
        itemSelectedColor: '#FFF',
        colorPrimary: '#FFF',
        colorBgContainer: '#000',
    },
    Divider: {
        colorSplit: secBgColor
    },
    Segmented: {
        itemSelectedBg: prColor,
        trackBg: secBgColor
    },
}
