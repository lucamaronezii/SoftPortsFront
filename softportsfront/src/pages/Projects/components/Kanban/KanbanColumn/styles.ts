import { Flex } from "antd";
import styled from "styled-components";
import { secBgColor } from "../../../../../styles/theme";

export const StyledKColumn = styled(Flex) <{ isDragging?: boolean }>`
    background-color: ${secBgColor};
    width: 290px;
    border-radius: 6px 6px 0px 0px;
    height: 100%;
    box-sizing: border-box;
    padding: 13px;
    flex-direction: column;
    gap: 13px;
    opacity: ${props => props.isDragging ? 0.6 : 1};
    cursor: grab;
    position: relative;
`