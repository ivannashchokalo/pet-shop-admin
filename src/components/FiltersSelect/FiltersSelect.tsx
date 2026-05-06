import { useSearchParams } from "react-router";
import Select from "react-select";

import type { OptionType } from "../../types/select";

import DropdownIndicator from "../Select/DropdownIndicator";
import { selectStyles } from "../Select/selectStyles";

interface FiltersSelectProps {
  paramKey: string;
  options: OptionType[];
}

export default function FiltersSelect({
  paramKey,
  options,
}: FiltersSelectProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(paramKey) || "";

  const handleChange = (selectedValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedValue) {
      params.set(paramKey, selectedValue);
    } else {
      params.delete(paramKey);
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  return (
    <Select<OptionType, false>
      options={options}
      value={options.find((option) => option.value === value)}
      onChange={(option) => handleChange(option?.value || "")}
      isSearchable={false}
      styles={selectStyles}
      components={{
        IndicatorSeparator: null,
        DropdownIndicator,
      }}
    />
  );
}
