import { useGetAnimalsQuery } from "../../services/animalsApi";
import { AgCharts } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import styles from "./AnimalsChart.module.scss";

export default function AnimalsPieChart() {
  const { data: animals } = useGetAnimalsQuery();

  const availableAnimals =
    animals?.animals.filter((animal) => animal.status === "available") ?? [];

  const dogCount = availableAnimals.filter(
    (animal) => animal.type === "dog",
  ).length;

  const catCount = availableAnimals.filter(
    (animal) => animal.type === "cat",
  ).length;

  const data = [
    { type: "Dog", count: dogCount },
    { type: "Cat", count: catCount },
  ];

  const options: AgChartOptions = {
    data,
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "pie",
        angleKey: "count",
        calloutLabelKey: "type",
        sectorLabelKey: "count",
        fills: ["#4caf50", "#ffca28"],
      },
    ],
  };

  return (
    <div>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          Available animals:<span>{availableAnimals.length}</span>
        </li>
        <li className={styles.listItem}>
          Dog:<span>{dogCount}</span>
        </li>
        <li className={styles.listItem}>
          Cat:<span>{catCount}</span>
        </li>
      </ul>
      <AgCharts options={options} />
    </div>
  );
}
