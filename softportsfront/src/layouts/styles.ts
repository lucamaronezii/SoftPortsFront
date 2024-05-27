import { Flex } from "antd";
import styled from "styled-components"
import { ILeftSidebarProps } from "./interfaces";

export const CustomSidebar = styled(Flex)<ILeftSidebarProps>`
    background-color: #252426;
    width: ${props => props.open ? '200px' : '100px'};
    height: 100vh;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    padding: 22px 20px;
    color: #FFF;
    gap: 20px;
`

export const CustomBox = styled.div`
    color: #fff;
    background-color: #000;
    min-height: 100vh;
`