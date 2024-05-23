import React, { cloneElement } from 'react'
import { ArrowDown, OptionsBox, StyledOption, StyledSidebarItem, StyledText } from './styles'
import { ISidebarItemProps } from './interfaces'
import { prColor } from '../../styles/theme'
import { useLocation, useNavigate } from 'react-router-dom'
import { Flex } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

const SidebarItem: React.FC<ISidebarItemProps> = ({ text, to, icFilled, icOutlined, hasChild }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const verify = location.pathname == to
    const selIcon = cloneElement(icFilled as React.ReactElement, { style: { color: '#FFF', fontSize: '19px' } })
    const unsIcon = cloneElement(icOutlined as React.ReactElement, { style: { color: prColor, fontSize: '19px' } })

    return (
        <>
            <StyledSidebarItem
                onClick={() => navigate(to)}
                selected={verify}
                hasChild={hasChild}
            >
                <Flex align='center' gap={12}>
                    {verify ? selIcon : unsIcon}
                    <StyledText>{text}</StyledText>
                </Flex>
                {hasChild &&
                    <ArrowDown isRotated={verify} />
                }
            </StyledSidebarItem>

            {hasChild && verify &&
                <OptionsBox vertical style={{ marginTop: '-8px' }}>
                    <StyledOption>
                        <Flex align='center'>
                            <StyledText>Projeto Omega</StyledText>
                        </Flex>
                    </StyledOption>
                    <StyledOption>
                        <Flex align='center'>
                            <StyledText>Projeto Alpha</StyledText>
                        </Flex>
                    </StyledOption>
                    <StyledOption>
                        <Flex align='center' gap={12}>
                            <PlusCircleOutlined />
                            <StyledText>Novo projeto</StyledText>
                        </Flex>
                    </StyledOption>
                </OptionsBox>
            }
        </>
    )
}

export default SidebarItem
