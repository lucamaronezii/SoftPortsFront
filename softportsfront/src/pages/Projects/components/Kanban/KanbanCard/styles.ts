import { Flex } from "antd";
import styled from "styled-components";
import { prColor } from "../../../../../styles/theme";

export const StyledKCard = styled(Flex)`
    height: 75px;
    width: 100%;
    background-color: ${prColor};
    border-radius: 6px;
    padding: 6px;
    cursor: grab;
    &:active {
        cursor: grabbing;
    }
`