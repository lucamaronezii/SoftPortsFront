import { Flex, Typography } from "antd";
import styled from "styled-components";
import { prColor, secBgColor } from "../../../../../styles/theme";

export const StyledKColumn = styled(Flex) <{ isDragging?: boolean }>`
    background-color: ${secBgColor};
    width: 290px;
    border-radius: 6px 6px 0px 0px;
    height: 98%;
    box-sizing: border-box;
    padding: 13px;
    flex-direction: column;
    opacity: ${props => props.isDragging ? 0.6 : 1};
    border: ${props => props.isDragging ? `1px ${prColor} solid` : "none"};
    position: relative;
    overflow-y: hidden;
`

export const StyledCardsBox = styled(Flex)`
    gap: 13px;
    flex-direction: column;
    overflow-y: auto;
    max-height: calc(100% - 100px);
    padding-right: 3px;
    scrollbar-color: #FFF transparent;
    scrollbar-width: thin;
`

export const ColumnTitle = styled(Typography)`
    margin: 4px 0px 10px 0px;
`