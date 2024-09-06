import { Flex } from "antd";
import styled from "styled-components";

export const NoIssuesBox = styled(Flex)`
    align-items: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const IssuesBox = styled(Flex)`
    gap: 12px;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
`