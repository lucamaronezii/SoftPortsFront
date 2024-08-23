import { PlusOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'
import React, { cloneElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGlobal from '../../hooks/useGlobal'
import { IProject } from '../../layouts/interfaces'
import { prColor } from '../../styles/theme'
import NewProjectModal from '../../layouts/components/NewProjectModal/NewProjectModal'
import { ISidebarItemProps } from './interfaces'
import { ArrowDown, OptionsBox, PjtsContainer, StyledOption, StyledSidebarItem, StyledText } from './styles'

const SidebarItem: React.FC<ISidebarItemProps> = ({ text, to, icFilled, icOutlined, hasChild, projects, loadingPjts, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const { selectedProject, setSelectedProject } = useGlobal()
    const navigate = useNavigate()
    const location = useLocation()
    const selIcon = cloneElement(icFilled as React.ReactElement, { style: { color: '#FFF', fontSize: '19px' } })
    const unsIcon = cloneElement(icOutlined as React.ReactElement, { style: { color: prColor, fontSize: '19px' } })
    const verify = location.pathname == to

    const handleClick = () => {
        if (onLogout) onLogout()
        if (hasChild) {
            setIsOpen(!isOpen)
        } else {
            navigate(to!)
        }
    }

    const handleProject = (project: IProject) => {
        navigate('/projetos')
        setSelectedProject(project)
    }

    useEffect(() => {
    }, [projects])

    return (
        <React.Fragment>
            <StyledSidebarItem
                onClick={handleClick}
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
                <OptionsBox style={{ marginTop: '-8px' }}>
                    {loadingPjts && <Spin style={{ marginBottom: '8px' }} />}
                    <PjtsContainer>
                        {projects!.map((project, index) => (
                            <StyledOption
                                key={index}
                                onClick={() => handleProject(project)}
                                selProject={selectedProject!.id}
                                idProject={project.id}
                            >
                                <Flex align='center'>
                                    <StyledText>{project.nome}</StyledText>
                                </Flex>
                            </StyledOption>
                        ))}
                    </PjtsContainer>
                    <StyledOption onClick={() => setOpenModal(true)}>
                        <Flex align='center' gap={12}>
                            <PlusOutlined />
                            <StyledText>Novo projeto</StyledText>
                        </Flex>
                    </StyledOption>
                </OptionsBox>
            }
            <NewProjectModal open={openModal} onClose={() => setOpenModal(false)} />
        </React.Fragment>
    )
}

export default SidebarItem
