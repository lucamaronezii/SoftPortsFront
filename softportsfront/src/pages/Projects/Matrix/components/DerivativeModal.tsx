import { message, Modal } from 'antd'
import React, { useState } from 'react'
import TitleSelect from '../../../../components/TitleSelect/TitleSelect'
import useProjects from '../../../../hooks/useProjects'
import { useAxios } from '../../../../auth/useAxios'
import { IDerivativeModal } from './interfaces'

const DerivativeModal: React.FC<IDerivativeModal> = ({ open, onClose, onCreated }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [derivatives, setDerivatives] = useState<string[]>([])
    const [messageApi, contextHolder] = message.useMessage()
    const { selectedProject } = useProjects()

    const axios = useAxios()

    const handleDerivatives = () => {
        let requestBody = {
            derivadoResponses: [] as any
        }

        derivatives.forEach((e) => {
            requestBody.derivadoResponses.push({
                nome: e,
                projetoId: selectedProject.id
            })
        })

        return requestBody
    }

    const createDerivatives = async () => {
        
        const body = handleDerivatives()
        
        if (!body.derivadoResponses.length) {
            messageApi.error('Insira derivados para prosseguir.')
            return
        }
        
        setLoading(true)

        await axios.post('/derivado/lista', body)
            .then(res => onCreated())
            .catch(err => messageApi.error('Ops! Tente novamente.'))
            .finally(() => setLoading(false))
    }

    return (
        <>
            {contextHolder}
            <Modal
                open={open}
                onCancel={onClose}
                onOk={createDerivatives}
                title='Adicionar derivados do projeto'
                destroyOnClose
                confirmLoading={loading}
                centered
            >
                <div style={{ marginBlock: '25px' }}>
                    <TitleSelect
                        text='Derivados do projeto'
                        mode="tags"
                        style={{ width: '100%' }}
                        tokenSeparators={[',']}
                        onChange={(e) => setDerivatives(e)}
                        placeholder={'Insira os derivados do projeto (requisitos, casos de uso, testes etc.)'}
                    />
                </div>
            </Modal>
        </>
    )
}

export default DerivativeModal
