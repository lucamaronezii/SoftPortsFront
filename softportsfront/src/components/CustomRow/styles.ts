import { Flex } from "antd";
import styled from "styled-components";

export const CustomRow = styled(Flex)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const TitleModal = styled(Flex)`
    gap: 10px;
`

export const CustomGrow = styled(Flex)`
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 1rem;
    flex-grow: 1;
    gap: 1rem;
`