import Select from "react-select";

import DropdownIndicator from "../Select/DropdownIndicator";
import { selectStyles } from "../Select/selectStyles";
import { animalOptions } from "../../constants/animalOptions";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function AnimalTypeSelect({ value, onChange }: Props) {
  return (
    <Select
      options={animalOptions}
      value={animalOptions.find((option) => option.value === value)}
      onChange={(option) => {
        if (option) {
          onChange(option.value);
        }
      }}
      isSearchable={false}
      styles={{
        ...selectStyles,
        control: (provided) => ({
          ...provided,
          borderRadius: "10px",
          borderColor: "#c0c0c0",
          borderWidth: "1px",
          borderStyle: "solid",
          backgroundColor: "#eee",
          padding: "8px 10px",
          width: "302px",
          cursor: "pointer",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#c0c0c0",
          },
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "#4d4d4d",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "1.5",
        }),
      }}
      components={{
        IndicatorSeparator: null,
        DropdownIndicator,
      }}
    />
  );
}
