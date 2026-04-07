import AnimalsPieChart from "../../components/AnimalsCharts/AnimalsPieChart";
import AnimalsStatusDonutChart from "../../components/AnimalsCharts/AnimalsStatusDonutChart";
import Container from "../../components/Container/Container";
import RequestsChart from "../../components/RequestsChart/RequestsChart";
import Section from "../../components/Section/Section";
import WeeklyRequestsChart from "../../components/RequestsChart/MonthlyRequestsChart";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <Section>
      <Container>
        <h1 className={styles.title}>Dashboard</h1>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <h2 className={styles.listTitle}>Animals</h2>
            <AnimalsStatusDonutChart />
            <AnimalsPieChart />
          </li>
          <li className={styles.listItem}>
            <h2 className={styles.listTitle}>Requests</h2>
            <RequestsChart />
            <WeeklyRequestsChart />
          </li>
        </ul>
      </Container>
    </Section>
  );
}
