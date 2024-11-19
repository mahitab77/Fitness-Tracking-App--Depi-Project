import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  // PointElement,
  // Title,
  // Legend,
} from "chart.js";
import {
  monthlyLabels,
  weeklyLabels,
  yearlyLabels,
} from "../../../lib/utils";



ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  // Title,
  // Legend,
);

const BarChart = ({ period, id, dataSets }) => {
  // const [dataSet, setDataSet] = useState(
  //   aggregateLogsByPeriod(period, dateRange, fakeLogs),
  // );

  // useEffect(() => {
  //   setDataSet(aggregateLogsByPeriod(period, dateRange, fakeLogs));
  // }, [period]);

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
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Bar
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
export default BarChart;
