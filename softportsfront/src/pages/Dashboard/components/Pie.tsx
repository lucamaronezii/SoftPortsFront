import { Line, Pie, PolarArea } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, RadialLinearScale, ArcElement } from 'chart.js'
import { prColor } from '../../../styles/theme'
import { darken, lighten } from 'polished'
import styled from 'styled-components'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, RadialLinearScale, ArcElement
)

const pieChartData = {
    labels: [
        "Incidentes",
        "Problemas",
        "Mudanças"
    ],
    datasets: [{
        label: 'Ocorrências',
        data: [11, 16, 7],
        backgroundColor: [
            prColor,
            darken(0.15, prColor),
            lighten(0.2, prColor)
        ]
    }]
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

export const PieGraph = () => {
    return (
        <div style={{flex: 1}}>
            <Pie options={options as any} data={pieChartData} />
        </div>
    )
}
