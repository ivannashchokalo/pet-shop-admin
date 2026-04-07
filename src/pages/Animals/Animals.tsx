import AnimalsList from "../../components/AnimalsList/AnimalsList";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ReactPaginate from "react-paginate";
import { Toaster } from "react-hot-toast";
import { Link, useLocation, useSearchParams } from "react-router";
import styles from "./Animals.module.scss";
import Icon from "../../components/Icon/Icon";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
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
  const handlePageChange = ({ selected }: { selected: number }) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(selected + 1));
    setSearchParams(params);
  };

  return (
    <Section>
      <Container>
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
        <Toaster />
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
        {data?.totalPages > 1 && (
          <ReactPaginate
            pageCount={data?.totalPages}
            onPageChange={handlePageChange}
            forcePage={page - 1}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            previousLabel={
              <Icon name="arrow-l" size={24} className={styles.paginateArrow} />
            }
            nextLabel={
              <Icon name="arrow-r" size={24} className={styles.paginateArrow} />
            }
            breakLabel="..."
            renderOnZeroPageCount={null}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            disabledClassName={styles.disabled}
          />
        )}
      </Container>
    </Section>
  );
}
