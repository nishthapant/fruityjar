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
            backgroundColor: [
              "#38A169",
              "#ECC94B",
              "#319795",
              "#D69E2E",
              "#2F855A",
              "#DD6B20",
              "#81E6D9",
              "#9AE6B4",
              "#F6AD55",
              "#718096",
              "#F6AD55",
              "#D69E2E",
              "#ED8936",
              "#DD6B20",
              "#C05621",
              "#9C4221",
              "#C53030",
              "#E53E3E",
              "#F56565",
              "#742A2A",
              "#97266D",
              "#63171B",
            ],
          },
        ],
      }}
    />
  );
};

export default JarPieChart;
