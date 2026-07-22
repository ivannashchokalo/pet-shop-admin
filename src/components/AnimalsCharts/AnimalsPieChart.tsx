import { AgCharts } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import { useGetStatisticsQuery } from "../../services/statisticsApi";
import styles from "./AnimalsChart.module.scss";

export default function AnimalsPieChart() {
  const { data: statistics } = useGetStatisticsQuery();

  const availableAnimals = statistics?.animalsAvailableCount ?? 0;

  const dogCount = statistics?.availableDogsCount ?? 0;
  const catCount = statistics?.availableCatsCount ?? 0;
  const birdCount = statistics?.availableBirdsCount ?? 0;
  const rodentCount = statistics?.availableRodentsCount ?? 0;

  const data = [
    { type: "Dog", count: dogCount },
    { type: "Cat", count: catCount },
    { type: "Bird", count: birdCount },
    { type: "Rodent", count: rodentCount },
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
        fills: ["#4caf50", "#ffca28", "#42a5f5", "#ab47bc"],
      },
    ],
  };

  return (
    <div>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          Available animals:<span>{availableAnimals}</span>
        </li>

        <li className={styles.listItem}>
          Dog:<span>{dogCount}</span>
        </li>

        <li className={styles.listItem}>
          Cat:<span>{catCount}</span>
        </li>

        <li className={styles.listItem}>
          Bird:<span>{birdCount}</span>
        </li>

        <li className={styles.listItem}>
          Rodent:<span>{rodentCount}</span>
        </li>
      </ul>

      <AgCharts options={options} />
    </div>
  );
}
