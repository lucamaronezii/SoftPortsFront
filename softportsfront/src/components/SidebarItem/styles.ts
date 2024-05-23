import styled from "styled-components";
import { prColor } from "../../styles/theme";
import { Typography } from "antd";
import { darken } from "polished";

export const StyledSidebarItem = styled.div`
    width: 169px;
    height: 40px;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    gap: 12px;
    transition: background-color 0.3s;
    &:hover {
        background-color: ${darken(0.2, prColor)};
    }
`

export const StyledText = styled(Typography.Text)`
    font-weight: 500;
    color: #fff;
    user-select: none;
`