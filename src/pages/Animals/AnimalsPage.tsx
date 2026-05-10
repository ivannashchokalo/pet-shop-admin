import AnimalsList from "../../components/AnimalsList/AnimalsList";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import { Toaster } from "react-hot-toast";
import { Link, useLocation, useSearchParams } from "react-router";

import styles from "./AnimalsPage.module.scss";

import Icon from "../../components/Icon/Icon";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import Pagination from "../../components/Pagination/Pagination";

import { useGetAnimalsQuery } from "../../services/animalsApi";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function Animals() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const status = searchParams.get("status") || "";
  const page = Number(searchParams.get("page")) || 1;

  const location = useLocation();

  const { data, isLoading, isError } = useGetAnimalsQuery({
    page,
    search,
    type,
    status,
  });

  const totalPages = data?.totalPages ?? 0;

  const handlePageChange = ({ selected }: { selected: number }) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(selected + 1));

    setSearchParams(params);
  };

  return (
    <Section>
      <Container>
        <Toaster />
        <div className={styles.wrapper}>
          <h1 className={styles.title}>
            Animals
            <span className={styles.subTitle}>
              Manage the list of all animals in the system.
            </span>
          </h1>
          <Link
            to="/animals/new"
            className={styles.addButton}
            state={{ from: location }}
          >
            <Icon name="plus" size={20} className={styles.plus} />
            Add animal
          </Link>
        </div>
        <div className={styles.filter}>
          <FilterPanel />
        </div>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        <div className={styles.animals}>
          {data?.animals && data.animals.length > 0 && (
            <AnimalsList animals={data.animals} />
          )}
        </div>
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </Section>
  );
}
