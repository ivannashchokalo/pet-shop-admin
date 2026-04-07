import { useSearchParams } from "react-router";
import Select from "react-select";
import DropdownIndicator from "../Select/DropdownIndicator";
import { selectStyles } from "../Select/selectStyles";
import type { OptionType } from "../../types/select";

export default function TypeFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "";

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("type", value);
    } else {
      params.delete("type");
    }

    params.set("page", "1");
    setSearchParams(params);
  };

  const options: OptionType[] = [
    { value: "", label: "Animal type" },
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
  ];

  return (
    <Select
      options={options}
      value={options.find((option) => option.value === type)}
      onChange={(option) => {
        if (option) handleTypeChange(option.value);
      }}
      placeholder="Type"
      isSearchable={false}
      styles={selectStyles}
      components={{
        IndicatorSeparator: null,
        DropdownIndicator,
      }}
    />
  );
}
