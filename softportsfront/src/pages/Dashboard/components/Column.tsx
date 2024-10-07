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
import React, { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

interface ProjetoData {
  valor: number;
  nomeProjeto: string;
}

interface ColumnGraphProps {
  dadosPorProjeto: ProjetoData[];
}

export const ColumnGraph: React.FC<ColumnGraphProps> = ({ dadosPorProjeto }) => {
  const [barChartData, setBarChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Total de Ocorrências',
        data: [] as number[],
        backgroundColor: [] as string[],
      },
    ],
  });

  useEffect(() => {
    // Processa os dados da response
    const labels = dadosPorProjeto.map((item) => item.nomeProjeto);
    const occurrences = dadosPorProjeto.map((item) => item.valor);
    
    // Definir as cores para cada barra
    const backgroundColor = [
      prColor,
      darken(0.15, prColor),
      lighten(0.2, prColor),
      darken(0.15, prColor),
      lighten(0.2, prColor),
    ];

    // Atualiza os dados do gráfico
    setBarChartData({
      labels: labels,
      datasets: [
        {
          label: 'Total de Ocorrências',
          data: occurrences,
          backgroundColor: backgroundColor.slice(0, dadosPorProjeto.length), // Ajustar conforme o número de projetos
        },
      ],
    });
  }, [dadosPorProjeto]);

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

  return (
    <BarContainer>
      <Bar options={options} data={barChartData} />
    </BarContainer>
  );
};
