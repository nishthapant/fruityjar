import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { JarPieChartProps } from "./types";

ChartJS.register(ArcElement, Tooltip, Legend);

const JarPieChart: React.FC<JarPieChartProps> = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <Pie
      data={{
        labels,
        datasets: [
          {
            label: "Calories",
            data: values,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      }}
    />
  );
};

export default JarPieChart;
