import { Flex, Typography } from "antd";
import styled from "styled-components";
import { plcColor } from "../../../../../styles/theme";

export const CommentTime = styled(Typography.Text)`
    font-size: 10px;
    color: ${plcColor};
    margin-top: 4px;
`

export const FooterFlex = styled(Flex)`
    gap: 12px;
    align-items: center;
    margin-left: auto;
`