import { Flex, Layout } from "antd";
import { Typography } from "antd/lib";
import styled from "styled-components";

export const SubnavPad = styled(Flex)`
    padding: 20px 0px 0px 20px;
`

export const StyledTitle = styled(Typography)`
    color: #fff;
    font-family: 'Inter';
    font-size: 28px;
    font-weight: 500;
`

export const StyledLayout = styled(Layout)`
    min-height: 100vh;
    padding-left: 16px;
    gap: 27px;
`

export const StyledUsersBox = styled.div`
    gap: 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`