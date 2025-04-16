import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Budget } from '../../services/budget/typing';
import { notification } from 'antd';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface BudgetChartProps {
  budget: Budget;
}

const BudgetChart = ({ budget }: BudgetChartProps) => {
  const totalSpent = budget.items.reduce((sum, item) => sum + item.amount, 0);

useEffect(() => {
  if (totalSpent > budget.totalBudget) {
    notification.error({
      message: 'Cảnh báo vượt ngân sách',
      description: `Bạn đã chi ${totalSpent.toLocaleString()} VNĐ, vượt quá ngân sách ${budget.totalBudget.toLocaleString()} VNĐ!`,
    });
  }
}, [totalSpent, budget]);

  const randomColors = budget.items.map(() => generateRandomColor());

  const data = {
    labels: budget.items.map((item) => item.category),
    datasets: [
      {
        data: budget.items.map((item) => item.amount),
        backgroundColor:randomColors,
        borderColor: ['#fff'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${context.raw?.toLocaleString()} VNĐ`,
              },
            },
          },
        }}
      />
      <div style={{ textAlign: 'center', marginTop: '20px', color: '#ff4d4f' }}>
        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Tổng chi: {totalSpent.toLocaleString()} VNĐ / Ngân sách: {budget.totalBudget.toLocaleString()} VNĐ
        </p>
      </div>
    </div>
  );
};

export default BudgetChart;