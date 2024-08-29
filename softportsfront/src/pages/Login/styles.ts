import { Flex, Layout, Typography } from "antd";
import styled from "styled-components";
import { prColor, secBgColor } from "../../styles/theme";
import loginbg from "../../assets/loginbg.jpg"

export const ImageLogin = styled(Layout)`
    background-color: #000;
    flex-grow: 1;
    background-image: url(${loginbg});
    background-size: 100% 100%;
    background-repeat: no-repeat;
`

export const LoginBox = styled(Flex)`
    background-color: ${secBgColor};
    width: 40%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const LoginCard = styled(Flex)`
    width: 75%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px;
    box-sizing: border-box;
    gap: 35px;
    border-radius: 6px;
`

export const ResetPw = styled.span`
    color: ${prColor};
    font-weight: 500;
    cursor: pointer;
`

export const Title = styled(Typography)`
    font-size: 35px;
    font-weight: 500;
`