import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Comparación Categórica",
    },
  },
};

export function Barplot({
  table,
  col1,
  col2,
}: {
  table: any;
  col1: string;
  col2: string;
}) {
  // Swap if col1 is numeric
  if (typeof table[0][col1] == "number") {
    [col1, col2] = [col2, col1];
  }

  const labels = [...new Set(table.map((item: any) => item[col1]))];
  let agg_sums: any = [];
  let counts: any = [];
  table.forEach((item: any) => {
    if (agg_sums[labels.indexOf(item[col1])]) {
      agg_sums[labels.indexOf(item[col1])] += parseFloat(item[col2]);
      counts[labels.indexOf(item[col1])] += 1;
    } else {
      agg_sums[labels.indexOf(item[col1])] = parseFloat(item[col2]);
      counts[labels.indexOf(item[col1])] = 1;
    }
  });

  let means: any = [];
  agg_sums.forEach((item: any, index: any) => {
    means[index] = item / counts[index];
  });

  const data = {
    labels,
    datasets: [
      {
        label: `Media ${col2} por ${col1}`,
        data: means,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
