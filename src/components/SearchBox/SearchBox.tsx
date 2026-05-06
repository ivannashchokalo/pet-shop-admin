import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Icon from "../Icon/Icon";
import styles from "./SearchBox.module.scss";

export default function SearchBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [value, setValue] = useState(search);

  useEffect(() => {
    setValue(search);
  }, [search]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const search = value.trim();

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    setSearchParams(params);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.set("page", "1");
    setSearchParams(params);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <label htmlFor="search" className={styles.formLabel}>
        <input
          className={styles.formInput}
          id="search"
          type="text"
          name="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by name or breed"
        />
        <Icon name="search" size={20} className={styles.placeholderIcon} />
        {value && (
          <button
            onClick={handleClear}
            type="button"
            className={styles.searchCrossBtn}
          >
            <Icon name="cross" size={24} className={styles.searchCrossIcon} />
          </button>
        )}
      </label>

      <button className={styles.formSubmitBtn}>Search</button>
    </form>
  );
}
