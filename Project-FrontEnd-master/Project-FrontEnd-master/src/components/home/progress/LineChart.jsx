import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  PointElement,
  // Title,
  // Legend,
} from "chart.js";
import { monthlyLabels, weeklyLabels, yearlyLabels } from "../../../lib/utils";

ChartJs.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  // Title,
  // Legend,
);

const LineChart = ({ period, id, dataSets }) => {
  const chartData = {
    labels:
      period === "weekly"
        ? weeklyLabels
        : period === "monthly"
          ? monthlyLabels
          : yearlyLabels,
    datasets: [
      {
        label: id,
        data: dataSets[id],

        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1.5,
        tension: 0.3,
      },
    ],
  };
  return (
    <Line
      data={chartData}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};
export default LineChart;
