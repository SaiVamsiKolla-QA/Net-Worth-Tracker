import React, { useMemo } from 'react';
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
  Filler,
} from 'chart.js';
import { Snapshot } from '../../models/Snapshot';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface NetWorthChartProps {
  snapshots: Snapshot[];
  projections: Array<{ month: number; netWorth: number }>;
}

const NetWorthChart: React.FC<NetWorthChartProps> = ({ snapshots, projections }) => {
  const { theme } = useTheme();

  const chartData = useMemo(() => {
    const historicalLabels = snapshots.map((s) => s.getFormattedDate()).reverse();
    const historicalData = snapshots.map((s) => s.netWorth).reverse();

    const projectionLabels = projections.slice(1).map((p) => `+${p.month}m`);
    const projectionData = projections.map((p) => p.netWorth);

    const labels = [...historicalLabels, ...projectionLabels];
     return {
      labels,
      datasets: [
        {
          label: 'Historical Net Worth',
          data: historicalData.concat(new Array(projectionLabels.length).fill(null)),
          borderColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
          backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: 'Projected Net Worth',
          data: new Array(historicalData.length).fill(null).concat(projectionData),
          borderColor: theme === 'dark' ? '#8b5cf6' : '#7c3aed',
          backgroundColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.1)',
          borderDash: [5, 5],
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [snapshots, projections, theme]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme === 'dark' ? '#f9fafb' : '#1f2937',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          callback: (value: any) => formatCurrency(value),
        },
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb',
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default NetWorthChart;