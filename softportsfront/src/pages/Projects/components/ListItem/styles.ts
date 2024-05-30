import { Flex, Typography } from "antd";
import styled from "styled-components";
import { prColor, secBgColor } from "../../../../styles/theme";
import { darken } from "polished";

export const StyledItem = styled(Flex)`
    background-color: ${secBgColor};
    border-radius: 6px;
    padding: 10px;
    gap: 12px;
    justify-content: space-between;
    box-shadow: 0px 3px ${prColor};
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: ${darken(0.04, secBgColor)}
    }
`

export const StyledChild = styled(Flex) <{ width?: string }>`
    width: ${props => props.width || '20%'};
    max-width: ${props => props.width || '20%'};
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
`

export const StyledListText = styled(Typography)`
    text-overflow: ellipsis;
    white-space: nowrap;
`