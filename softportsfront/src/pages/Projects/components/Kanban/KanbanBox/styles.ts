import { Flex } from "antd";
import styled from "styled-components";

export const StyledKBox = styled(Flex)`
    height: 100%;
    overflow-x: auto;
    position: relative;
    margin-right: -36px;
`

export const StyledInnerBox = styled(Flex)`
    position: absolute;
    height: 100%;
    display: flex;
    gap: 25px;
`