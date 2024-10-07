import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { prColor } from '../../../styles/theme'
import { darken, lighten } from 'polished'
import styled from 'styled-components'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
)

const LineContainer = styled.div`
    width: 100%;
    height: 100%; 
    margin: 0 auto; 
`;

const lineChartData = {
    labels: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
    ],
    datasets: [
        {
            label: "Incidentes",
            data: [1000, 2000, 3000, 4000, 5000],
            backgroundColor: prColor,
            borderColor: prColor,
        },
        {
            label: "Problemas",
            data: [2000, 3000, 1000, 5000, 1000],
            backgroundColor: darken(0.15, prColor),
            borderColor: darken(0.15, prColor),
        },
        {
            label: "Mudanças",
            data: [5000, 4000, 3000, 2000, 1000],
            backgroundColor: lighten(0.2, prColor),
            borderColor: lighten(0.2, prColor),
        },
    ]
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        }
    },
}

export const LineGraph = () => {
    return (
        <LineContainer>
            <Line options={options as any} data={lineChartData} />
        </LineContainer>
    )
}
