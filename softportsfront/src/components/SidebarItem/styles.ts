import { CaretDownFilled } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import styled from "styled-components";
import { prColor } from "../../styles/theme";
import { darkerPr } from "../../utils/darkerPrimary";
import { ISidebarItemProps } from "./interfaces";

export const StyledSidebarItem = styled.div<Partial<ISidebarItemProps>>`
    width: 169px;
    height: 40px;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    position: relative;
    background-color: ${props => props.dropOpen ? darkerPr : props.selected ? prColor : ''};
    align-items: center;
    border-radius: ${props => props.dropOpen ? '8px 8px 0px 0px' : '8px'};
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: ${props => props.selected ? prColor : props.selected && props.hasChild ? '' : darkerPr};
    }
`

export const StyledText = styled(Typography.Text)`
    font-weight: 600;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

export const LogoBox = styled.div`
    display: flex;
    padding: 0px 10px 10px 10px;
    align-items: center;
    gap: 7px;
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
    font-weight: 500;
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
    position: relative;
    flex-direction: column;
    border-radius: 0px 0px 8px 8px;
    padding-block: 10px;
    box-sizing: border-box;
    gap: 10px;
    justify-content: center;
    align-items: center;
`

export const PjtsContainer = styled(Flex)`
    flex-direction: column;
    gap: 10px;
    max-height: 35vh;
    overflow: auto;
    &::-webkit-scrollbar-thumb {
        background: ${prColor};
        border-radius: 3px;
    };
    &::-webkit-scrollbar-track {
        border-radius: 3px;
    }
`

export const StyledOption = styled(StyledSidebarItem)`
    background-color: ${props => props.selProject == props.idProject ? prColor : darkerPr};
    width: 150px;
    margin-inline: 3px;
    &:hover {
        background-color: ${prColor};
    }
`
