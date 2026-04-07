import { useGetAnimalsQuery } from "../../services/animalsApi";
import { AgCharts } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import styles from "./AnimalsChart.module.scss";

export default function AnimalsStatusDonutChart() {
  const { data } = useGetAnimalsQuery();
  const animals = data?.animals ?? [];

  const availableCount = animals.filter(
    (animal) => animal.status === "available",
  ).length;

  const reservedCount = animals.filter(
    (animal) => animal.status === "reserved",
  ).length;

  const soldCount = animals.filter((animal) => animal.status === "sold").length;
  const totalAnimals = availableCount + reservedCount + soldCount;

  const chartData = [
    { status: "Available", count: availableCount },
    { status: "Reserved", count: reservedCount },
    { status: "Sold", count: soldCount },
  ];

  const options: AgChartOptions = {
    data: chartData,
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "donut",
        angleKey: "count",
        calloutLabelKey: "status",
        sectorLabelKey: "count",
        sectorSpacing: 4,
        cornerRadius: 8,
        fills: ["#28a745", "#ffc107", "#6c757d"],
        outerRadiusRatio: 0.9,
        innerRadiusRatio: 0.6,
        innerLabels: [
          {
            text: `${totalAnimals}`,
            fontSize: 28,
            fontWeight: "bold",
          },
          {
            text: "Total",
            fontSize: 14,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          Total animals:<span>{totalAnimals}</span>
        </li>
        <li className={styles.listItem}>
          Available:<span>{availableCount}</span>
        </li>
        <li className={styles.listItem}>
          Reserved:<span>{reservedCount}</span>
        </li>
        <li className={styles.listItem}>
          Sold:<span>{soldCount}</span>
        </li>
      </ul>
      <AgCharts options={options} />
    </div>
  );
}
