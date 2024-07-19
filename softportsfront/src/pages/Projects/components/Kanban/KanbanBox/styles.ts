import { Flex } from "antd";
import styled from "styled-components";
import { darkerPr } from "../../../../../utils/darkerPrimary";

export const StyledKBox = styled(Flex)`
    height: 100%;
    background-color: ${darkerPr};
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