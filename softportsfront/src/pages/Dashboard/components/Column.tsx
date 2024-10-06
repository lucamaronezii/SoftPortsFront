import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { prColor } from '../../../styles/theme';
import { darken, lighten } from 'polished';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const projectData = [
    { project: 'Projeto A', occurrences: 150 },
    { project: 'Projeto B', occurrences: 90 },
    { project: 'Projeto C', occurrences: 120 },
    { project: 'Projeto D', occurrences: 60 },
    { project: 'Projeto E', occurrences: 30 },
];

const labels = projectData.map((item) => item.project);
const occurrences = projectData.map((item) => item.occurrences);

const barChartData = {
    labels: labels,
    datasets: [
        {
            label: 'Total de Ocorrências',
            data: occurrences,
            backgroundColor: [
                prColor,
                darken(0.15, prColor),
                lighten(0.2, prColor),
                darken(0.15, prColor),
                lighten(0.2, prColor),
            ],
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#fff',
                font: {
                    size: 14,
                },
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(255, 255, 255, 0.2)',
            },
            ticks: {
                color: '#fff',
                font: {
                    size: 14,
                },
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (context: any) => `${context.parsed.y} ocorrências`,
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleColor: '#fff',
            bodyColor: '#fff',
        },
    },
};

export const ColumnGraph = () => {
    return (
        <BarContainer>
            <Bar options={options} data={barChartData} />
        </BarContainer>
    );
};
