import { Drawer, Flex, Input, Modal, Steps, Typography } from 'antd'
import React from 'react'
import { INewIssue } from './interfaces'
import { stepperItems } from '../../../../utils/stepperItems'
import TitleInput from '../../../../components/TitleInput/TitleInput'
import TitleTextArea from '../../../../components/TitleTextArea/TitleTextArea'
import TitleSelect from '../../../../components/TitleSelect/TitleSelect'
import TitleDatePicker from '../../../../components/TitleDatePicker/TitleDatePicker'
import { FieldsBox } from './styles'

const NewIssue: React.FC<INewIssue> = ({ open, onClose }) => {

    return (
        <Modal
            title="Novo registro de problema"
            open={open}
            onOk={onClose}
            onCancel={onClose}
            cancelText={'Cancelar'}
            width={1000}
            centered
        >
            <Flex
                // style={{ backgroundColor: 'red' }}
                gap={10}
            >
                <Flex
                // style={{ backgroundColor: '#7413FF' }}
                >
                    <Steps
                        direction='vertical'
                        items={stepperItems}
                        style={{ height: 'calc(100% + 100px)' }}
                    />
                </Flex>
                <FieldsBox>
                    <TitleInput text='Título' placeholder='Digite o título do problema' />
                    <TitleTextArea text='Descrição' rows={4} placeholder='Digite a descrição do problema' />
                    <TitleSelect text='Versão do Sistema Operacional' placeholder='Digite a versão do SO' />
                    <TitleInput text='Caminho entre telas' placeholder='Digite o caminho entre telas' />
                    <TitleDatePicker text='Data estimada para correção' placeholder='Digite a data estimada para correção' />
                </FieldsBox>
            </Flex>
        </Modal>
    )
}

export default NewIssue
