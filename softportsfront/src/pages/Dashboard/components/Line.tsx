import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { prColor } from '../../../styles/theme';
import { darken, lighten } from 'polished';
import styled from 'styled-components';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const months: string[] = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
];

interface DadoPorAno {
    year: number;
    month: number;
    valorIncidente: number;
    valorProblema: number;
    valorMudanca: number;
}

interface LineGraphProps {
    dadosPorAno: DadoPorAno[];
}

export const LineGraph: React.FC<LineGraphProps> = ({ dadosPorAno }) => {
    const [lineChartData, setLineChartData] = useState<ChartData<'line'>>({
        labels: months,
        datasets: [],
    });

    useEffect(() => {
        const incidenteData: number[] = new Array(12).fill(0);
        const problemaData: number[] = new Array(12).fill(0);
        const mudancaData: number[] = new Array(12).fill(0);

        dadosPorAno.forEach((item) => {
            const monthIndex = item.month - 1;
            incidenteData[monthIndex] = item.valorIncidente;
            problemaData[monthIndex] = item.valorProblema;
            mudancaData[monthIndex] = item.valorMudanca;
        });

        const datasets: ChartData<'line'>['datasets'] = [
            {
                label: 'Incidentes',
                data: incidenteData,
                backgroundColor: prColor,
                borderColor: prColor,
            },
            {
                label: 'Problemas',
                data: problemaData,
                backgroundColor: darken(0.15, prColor),
                borderColor: darken(0.15, prColor),
            },
            {
                label: 'Mudanças',
                data: mudancaData,
                backgroundColor: lighten(0.2, prColor),
                borderColor: lighten(0.2, prColor),
            },
        ];

        setLineChartData({
            labels: months,
            datasets: datasets,
        });
    }, [dadosPorAno]);

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#fff',
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <LineContainer>
            <Line options={options} data={lineChartData} />
        </LineContainer>
    );
};
