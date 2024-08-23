import React, { cloneElement, useState } from 'react'
import { ArrowDown, OptionsBox, StyledOption, StyledSidebarItem, StyledText } from './styles'
import { ISidebarItemProps } from './interfaces'
import { prColor } from '../../styles/theme'
import { useLocation, useNavigate } from 'react-router-dom'
import { Flex } from 'antd'
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import useGlobal from '../../hooks/useGlobal'
import { projects } from '../../mocks/Projects'
import NewProjectModal from '../NewProjectModal/NewProjectModal'

const SidebarItem: React.FC<ISidebarItemProps> = ({ text, to, icFilled, icOutlined, hasChild, onLogout }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { projectName, setProjectName } = useGlobal()
    const [isOpen, setIsOpen] = useState(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const verify = location.pathname == to
    const selIcon = cloneElement(icFilled as React.ReactElement, { style: { color: '#FFF', fontSize: '19px' } })
    const unsIcon = cloneElement(icOutlined as React.ReactElement, { style: { color: prColor, fontSize: '19px' } })

    const handleClick = () => {
        if (hasChild) {
            setIsOpen(!isOpen)
        } else {
            navigate(to!)
            setProjectName('')
        }
    }

    return (
        <React.Fragment>
            <StyledSidebarItem
                onClick={() => {
                    handleClick();
                    if (onLogout) onLogout()
                }}
                selected={verify}
                hasChild={hasChild}
                dropOpen={isOpen}
            >
                <Flex align='center' gap={14}>
                    {verify ? selIcon : unsIcon}
                    <StyledText>{text}</StyledText>
                </Flex>
                {hasChild &&
                    <ArrowDown isRotated={isOpen} />
                }
            </StyledSidebarItem>

            {hasChild && isOpen &&
                <OptionsBox vertical style={{ marginTop: '-8px' }}>
                    {projects.map((project, index) => (
                        <StyledOption
                            key={index}
                            onClick={() => {
                                navigate('/projetos')
                                setProjectName(project.name)
                                console.log(`selProject: ${projectName}; nameProject: ${project.name}`)
                            }}
                            selProject={projectName}
                            nameProject={project.name}
                        >
                            <Flex align='center'>
                                <StyledText>{project.name}</StyledText>
                            </Flex>
                        </StyledOption>
                    ))}
                    <StyledOption onClick={() => setOpenModal(true)}>
                        <Flex align='center' gap={12}>
                            <PlusOutlined />
                            <StyledText>Novo projeto</StyledText>
                        </Flex>
                    </StyledOption>
                </OptionsBox>
            }
            <NewProjectModal open={openModal} onClose={() => setOpenModal(false)}/>
        </React.Fragment>
    )
}

export default SidebarItem
