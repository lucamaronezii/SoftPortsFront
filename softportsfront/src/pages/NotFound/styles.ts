import { Button, Flex, Typography } from "antd";
import styled from "styled-components";

export const CustomWarnText = styled(Typography.Text)`
    font-size: 16px;
    text-align: center;
`

export const CustomBackButton = styled(Button)`
    width: 200px;
`

export const CustomBackBox = styled(Flex)`
    align-items: center;
    flex-direction: column;
    gap: 14px;
`