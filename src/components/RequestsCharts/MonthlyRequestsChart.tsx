import { AgCharts } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import { useGetRequestsQuery } from "../../services/requestsApi";
import syles from "./RequestsChart.module.scss";

export default function MonthlyRequestsChart() {
  const { data: requests } = useGetRequestsQuery();

  const monthCounts: Record<string, number> = {};

  requests?.forEach((request) => {
    const month = new Date(request.createdAt).toLocaleString("en-US", {
      month: "short",
    });

    monthCounts[month] = (monthCounts[month] || 0) + 1;
  });

  const monthsOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonthIndex = new Date().getMonth();

  const data = monthsOrder.slice(0, currentMonthIndex + 1).map((month) => ({
    month,
    count: monthCounts[month] || 0,
  }));

  const options: AgChartOptions = {
    data,
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "line",
        xKey: "month",
        yKey: "count",
        stroke: "#3b82f6",
        strokeWidth: 3,
        marker: {
          enabled: true,
          size: 8,
        },
      },
    ],
  };

  return (
    <div>
      <h3 className={syles.monthlyReqTitle}>Monthly requests trend</h3>
      <AgCharts options={options} />
    </div>
  );
}
