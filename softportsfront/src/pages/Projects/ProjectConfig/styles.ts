import { Button, Card, Flex, Typography } from "antd";
import styled from "styled-components";

export const ConfigBox = styled(Flex)`
    flex-direction: column;
    gap: 20px;
    width: 200px;
`

export const CustomCard = styled(Card)`
    min-width: 400px;
    gap: 10px;
`

export const CustomText = styled(Typography.Text)`
    font-size: 12px;
` 

export const CustomButton = styled(Button)`
    width: 40%;
    align-self: end;
`