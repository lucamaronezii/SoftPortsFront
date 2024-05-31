import { MapToken } from "antd/es/theme/interface";
import { ComponentsToken } from "antd/es/theme/context";

export const prColor = "#1CAE9D"
export const secBgColor = "#252426"
export const plcColor = "#858585"

export const token: Partial<MapToken> = {
    borderRadius: 6,
    colorPrimary: prColor,
    colorBgLayout: '#000',
    colorText: '#FFF',
    colorError: '#FB223B',
}

export const components: Partial<ComponentsToken> = {
    Input: {
        colorBgContainer: 'transparent',
        colorTextPlaceholder: plcColor,
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
    Select: {
        selectorBg: 'transparent',
        colorTextPlaceholder: plcColor,
        multipleItemBg: prColor
    },
    DatePicker: {
        colorBgContainer: 'transparent',
        colorTextPlaceholder: plcColor,
    },
}
