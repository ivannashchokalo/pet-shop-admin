import type { StylesConfig } from "react-select";
import type { OptionType } from "../../types/select";

export const selectStyles: StylesConfig<OptionType> = {
  control: (provided) => ({
    ...provided,
    borderRadius: "10px",
    borderColor: "#c0c0c0",
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "8px 10px",
    minWidth: "165px",
    cursor: "pointer",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#c0c0c0",
    },
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
    marginTop: "4px",
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 0,
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),

  singleValue: (provided) => ({
    ...provided,
    fontFamily: "var(--font-main)",
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#c0c0c0",
  }),

  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),

  option: (provided, state) => ({
    ...provided,
    fontFamily: "var(--font-main)",
    backgroundColor: state.isFocused ? "#d9d9d9" : "transparent",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "1.5",
    letterSpacing: "0.01em",
    color: "#131313",
    padding: "5px 10px",
    cursor: "pointer",
  }),
};
