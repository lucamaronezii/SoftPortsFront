import { Flex, Typography } from "antd";
import styled from "styled-components";
import { prColor } from "../../../../../styles/theme";

export const StyledKCard = styled.div<{ isDragging?: boolean }>`
    min-height: 75px;
    width: 100%;
    background-color: ${prColor};
    border-radius: 6px;
    padding: 8px;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    opacity: ${props => props.isDragging ? 0.6 : 1};
    border: ${props => props.isDragging ? `1px #FFF solid` : "none"};
`

export const StyledFlexBox = styled(Flex)`
    flex-direction: column;
    justify-content: space-between;
    min-height: 60px;
`

export const StyledTitle = styled(Typography.Paragraph)`
    
`