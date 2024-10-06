import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { prColor } from '../../../styles/theme';
import { darken, lighten } from 'polished';
import styled from 'styled-components';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarContainer = styled.div`
  width: 100%;
  height: 100%;
`;

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

const labels = registersData.map((item) => item.date);

const incidentesData = registersData.map((item) => item.Incidentes);
const problemasData = registersData.map((item) => item.Problemas);
const mudancasData = registersData.map((item) => item.Mudancas);

const radarChartData = {
  labels: labels,
  datasets: [
    {
      label: 'Incidentes',
      data: incidentesData,
      backgroundColor: lighten(0.4, prColor),
      borderColor: prColor,
      pointBackgroundColor: prColor,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: prColor,
      fill: true,
    },
    {
      label: 'Problemas',
      data: problemasData,
      backgroundColor: lighten(0.4, darken(0.15, prColor)),
      borderColor: darken(0.15, prColor),
      pointBackgroundColor: darken(0.15, prColor),
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: darken(0.15, prColor),
      fill: true,
    },
    {
      label: 'Mudanças',
      data: mudancasData,
      backgroundColor: lighten(0.4, lighten(0.2, prColor)),
      borderColor: lighten(0.2, prColor),
      pointBackgroundColor: lighten(0.2, prColor),
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: lighten(0.2, prColor),
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
  },
  scales: {
    r: {
      angleLines: {
        display: true,
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

export const RadarGraph = () => {
  return (
    <RadarContainer>
      <Radar data={radarChartData} options={options as any} />
    </RadarContainer>
  );
};
