import { message } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ColumnGraph } from './components/Column';
import { LineGraph } from './components/Line';
import { PieGraph } from './components/Pie';
import { CustomDashBox, CustomDashLayout, CustomFirstLine, DashTitle, StyledBox } from './styles';

const registersData = [
    { date: 'Jan 24', Incidentes: 60, Problemas: 65, Mudancas: 24 },
    { date: 'Fev 24', Incidentes: 14, Problemas: 57, Mudancas: 91 },
    { date: 'Mar 24', Incidentes: 80, Problemas: 61, Mudancas: 86 },
    { date: 'Abr 24', Incidentes: 85, Problemas: 35, Mudancas: 51 },
    { date: 'Mai 24', Incidentes: 25, Problemas: 93, Mudancas: 84 },
    { date: 'Jun 24', Incidentes: 89, Problemas: 92, Mudancas: 2 },
    { date: 'Jul 24', Incidentes: 97, Problemas: 21, Mudancas: 68 },
    { date: 'Ago 24', Incidentes: 8, Problemas: 23, Mudancas: 39 },
    { date: 'Set 24', Incidentes: 29, Problemas: 40, Mudancas: 93 },
    { date: 'Out 24', Incidentes: 69, Problemas: 38, Mudancas: 95 },
    { date: 'Nov 24', Incidentes: 49, Problemas: 2, Mudancas: 72 },
    { date: 'Dez 24', Incidentes: 79, Problemas: 34, Mudancas: 49 },
];

const registers = [
    {
        name: 'Incidentes',
        quantity: 980,
    },
    {
        name: 'Problemas',
        quantity: 455,
    },
    {
        name: 'Mudanças',
        quantity: 390,
    }
];

const dataFormatter = (number: number) =>
    `${number} registros`;

export const Dashboard = () => {
    const location = useLocation()
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        message.destroy()
        if (location.state?.deleted) {
            messageApi.success(`Projeto ${location.state?.deleted} excluído com sucesso.`)
        }
    }, [location.state])

    return (
        <div>
            {contextHolder}
            {/* dashboard */}
            <CustomDashLayout>
                <CustomDashBox>
                    <CustomFirstLine>
                        <StyledBox>
                            <DashTitle>Ocorrências abertas</DashTitle>
                            <PieGraph />
                        </StyledBox>
                        <StyledBox>
                            <DashTitle>Ocorrências por projeto</DashTitle>
                            <ColumnGraph />
                        </StyledBox>
                    </CustomFirstLine>
                    <StyledBox flex={1}>
                        <DashTitle>Ocorrências abertas em 2024</DashTitle>
                        <LineGraph />
                    </StyledBox>
                </CustomDashBox>
            </CustomDashLayout>
        </div>
    )
}
