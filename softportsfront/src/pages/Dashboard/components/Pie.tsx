import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, RadialLinearScale, Title, Tooltip } from 'chart.js'
import { darken, lighten } from 'polished'
import { Pie } from 'react-chartjs-2'
import { prColor } from '../../../styles/theme'

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
        ],
        borderColor: [
            'transparent'
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
