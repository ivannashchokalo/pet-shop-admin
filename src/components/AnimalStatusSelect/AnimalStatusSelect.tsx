import Select from "react-select";
import type { OptionType } from "../../types/select";
import DropdownIndicator from "../Select/DropdownIndicator";
import { selectStyles } from "../Select/selectStyles";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const options: OptionType[] = [
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
];

export default function AnimalStatusSelect({ value, onChange }: Props) {
  return (
    <Select<OptionType, false>
      options={options}
      value={options.find((option) => option.value === value)}
      onChange={(option) => {
        if (option) {
          onChange(option.value);
        }
      }}
      isSearchable={false}
      styles={selectStyles}
      components={{
        IndicatorSeparator: null,
        DropdownIndicator,
      }}
    />
  );
}
