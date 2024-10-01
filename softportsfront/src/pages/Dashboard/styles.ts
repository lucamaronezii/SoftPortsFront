import { Flex } from "antd";
import styled from "styled-components";

export const CustomDashLayout = styled(Flex)`
    height: 100vh;
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
    gap: 0.75rem;
`

export const CustomFirstLine = styled(Flex)`
    gap: 0.625rem;
    justify-content: space-between;
    flex-grow: 1;
`

export const CustomChild = styled(Flex)`
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    width: 33.3%;
    flex-direction: column;
`
