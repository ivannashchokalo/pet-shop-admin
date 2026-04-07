import { AgCharts } from "ag-charts-react";
import styles from "./RequestsChart.module.scss";
import { useGetRequestsQuery } from "../../services/requestsApi";
import type { AgChartOptions } from "ag-charts-community";

export default function RequestsChart() {
  const { data: requests } = useGetRequestsQuery();

  const totalRequestsCount = requests?.length ?? 0;

  const newRequestsCount =
    requests?.filter((request) => request.status === "new").length ?? 0;

  const contactedRequestsCount =
    requests?.filter((request) => request.status === "contacted").length ?? 0;

  const closedRequestsCount =
    requests?.filter((request) => request.status === "closed").length ?? 0;

  const data = [
    {
      status: "Requests",
      new: newRequestsCount,
      contacted: contactedRequestsCount,
      closed: closedRequestsCount,
    },
  ];

  const options: AgChartOptions = {
    data,
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "bar",
        xKey: "status",
        yKey: "new",
        fill: "#3b82f6",
        cornerRadius: 8,
      },
      {
        type: "bar",
        xKey: "status",
        yKey: "contacted",
        fill: "#ffc107",
        cornerRadius: 8,
      },
      {
        type: "bar",
        xKey: "status",
        yKey: "closed",
        fill: "#64748b",
        cornerRadius: 8,
      },
    ],
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          New requests: <span>{newRequestsCount}</span>
        </li>
        <li className={styles.listItem}>
          Total: <span>{totalRequestsCount}</span>
        </li>
        <li className={styles.listItem}>
          Contacted: <span>{contactedRequestsCount}</span>
        </li>
        <li className={styles.listItem}>
          Closed: <span>{closedRequestsCount}</span>
        </li>
      </ul>
      <AgCharts options={options} />
    </div>
  );
}
