import ReactPaginate from "react-paginate";
import Icon from "../Icon/Icon";
import styles from "./Pagination.module.scss";

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: ({ selected }: { selected: number }) => void;
};

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: Props) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={onPageChange}
      forcePage={currentPage - 1}
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
  );
}
