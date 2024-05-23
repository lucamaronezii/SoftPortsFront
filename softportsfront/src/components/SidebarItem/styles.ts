import styled from "styled-components";
import { prColor } from "../../styles/theme";
import { Flex, Typography } from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import { ISidebarItemProps } from "./interfaces";
import { darkerPr } from "../../utils/darkerPrimary";

export const StyledSidebarItem = styled.div<Partial<ISidebarItemProps>>`
    width: 169px;
    height: 40px;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    position: relative;
    background-color: ${props => props.selected ? props.hasChild ? darkerPr : prColor : ''};
    align-items: center;
    border-radius: ${props => props.selected && props.hasChild ? '8px 8px 0px 0px' : '8px'};
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: ${props => props.selected ? prColor : props.selected && props.hasChild ? '' : darkerPr};
    }
`

export const StyledText = styled(Typography.Text)`
    font-weight: 500;
    color: #fff;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

export const LogoBox = styled.div`
    display: flex;
    padding: 0px 10px 10px 10px;
    align-items: center;
    gap: 10px;
`

export const ImageBox = styled.div`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
`;

export const LogoText = styled(StyledText)`
    font-size: 20px;
`

export const ArrowDown = styled(CaretDownFilled) <{ isRotated: boolean }>`
    font-size: 10px;
    position: absolute;
    right: 15px;
    transform: rotate(${props => (props.isRotated ? 180 : 0)}deg);
    transition: transform 0.3s ease;
`

export const OptionsBox = styled(Flex)`
    background-color: ${darkerPr};
    border-radius: 0px 0px 8px 8px;
    padding: 10px 0px;
    box-sizing: border-box;
    gap: 10px;
    justify-content: center;
    align-items: center;
`

export const StyledOption = styled(StyledSidebarItem)`
    background-color: ${darkerPr};
    width: 150px;
    &:hover {
        background-color: ${prColor};
    }
`