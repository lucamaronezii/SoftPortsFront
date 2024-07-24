import { Layout } from "antd";
import styled from "styled-components";

export const CustomBox = styled(Layout) <{ mr?: number }>`
    margin: ${props => props.mr ? `0px 36px 0px ${props.mr}px` : "0px 36px 0px 36px"};
    gap: 20px;
    height: 85vh;
`