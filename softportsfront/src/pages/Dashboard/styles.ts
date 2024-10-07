import { Flex, Typography } from "antd";
import styled from "styled-components";

export const CustomDashLayout = styled(Flex)`
    height: 100vh;
    box-sizing: border-box;
    padding: 2.5rem;
    flex-direction: column;
    color: #fff;
    font-family: 'Inter', sans-serif;
`

export const CustomDashBox = styled(Flex)`
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
`

export const CustomFirstLine = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 0.625rem;
    column-gap: 3rem;
    height: 210px;
`

export const CustomChild = styled(Flex)`
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    width: 33.3%;
    flex-direction: column;
`

export const DashTitle = styled(Typography)`
    font-size: 1.25rem;
`

export const StyledBox = styled(Flex)`
    background-color: #242424;
    padding: 14px;
    border-radius: 8px;
    gap: 12px;
    flex-direction: column;
`
