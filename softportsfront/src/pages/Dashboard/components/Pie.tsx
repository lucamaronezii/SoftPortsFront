import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, RadialLinearScale, Title, Tooltip } from 'chart.js'
import { darken, lighten } from 'polished'
import { Pie } from 'react-chartjs-2'
import { prColor } from '../../../styles/theme'
import React, { useEffect, useState } from 'react'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, RadialLinearScale, ArcElement
)

interface Dados {
    valorIncidente: number;
    valorProblema: number;
    valorMudanca: number;
}

interface PieGraphProps {
    dados: Dados;
}

export const PieGraph: React.FC<PieGraphProps> = ({ dados }) => {
    const [pieChartData, setPieChartData] = useState({
        labels: [
            'Incidentes',
            'Problemas',
            'Mudanças'
        ],
        datasets: [
            {
                label: 'Ocorrências',
                data: [0, 0, 0],
                backgroundColor: [
                    prColor,
                    darken(0.15, prColor),
                    lighten(0.2, prColor)
                ],
                borderColor: ['transparent'],
            }
        ]
    });

    useEffect(() => {
        setPieChartData({
            labels: ['Incidentes', 'Problemas', 'Mudanças'],
            datasets: [
                {
                    label: 'Ocorrências',
                    data: [dados.valorIncidente, dados.valorProblema, dados.valorMudanca],
                    backgroundColor: [
                        prColor,
                        darken(0.15, prColor),
                        lighten(0.2, prColor)
                    ],
                    borderColor: ['transparent'],
                }
            ]
        });
    }, [dados]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#fff',
                }
            },
            tooltip: {
                titleColor: '#fff',
                bodyColor: '#fff', 
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }
        }
    };

    return (
        <div style={{ flex: 1 }}>
            <Pie options={options as any} data={pieChartData} />
        </div>
    );
};
