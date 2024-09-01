import { MapToken } from "antd/es/theme/interface";
import { ComponentsToken } from "antd/es/theme/context";

export const prColor = "#00A19F" // "#1CAE9D" (older)
export const secBgColor = "#252426"
export const plcColor = "#858585"
export const errColor = "#FB223B"

export const token: Partial<MapToken> = {
    borderRadius: 6,
    colorPrimary: prColor,
    colorBgLayout: '#000',
    colorText: '#FFF',
    colorError: errColor,
    fontFamily: 'Inter',
    fontSize: 13
}

export const components: Partial<ComponentsToken> = {
    Input: {
        colorBgContainer: 'transparent',
        colorTextPlaceholder: plcColor,
        addonBg: prColor,
        colorIcon: '#FFF',
    },
    Menu: {
        colorPrimary: '#FFF',
        colorBgContainer: 'transparent'
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
    Message: {
        colorSuccess: prColor,
        colorError: errColor,
        contentBg: secBgColor
    },
    Typography: {
        fontFamily: 'Inter'
    }
}
