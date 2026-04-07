import { useSearchParams } from "react-router";
import Select from "react-select";
import type { OptionType } from "../../types/select";
import { selectStyles } from "../Select/selectStyles";
import DropdownIndicator from "../Select/DropdownIndicator";

export default function StatusSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "";

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    params.set("page", "1");
    setSearchParams(params);
  };

  const options: OptionType[] = [
    { value: "", label: "Animal status" },
    { value: "available", label: "Available" },
    { value: "reserved", label: "Reserved" },
    { value: "sold", label: "Sold" },
  ];

  return (
    <Select<OptionType, false>
      options={options}
      value={options.find((option) => option.value === status)}
      onChange={(option) => handleStatusChange(option?.value || "")}
      placeholder="Status"
      isSearchable={false}
      styles={selectStyles}
      components={{
        IndicatorSeparator: null,
        DropdownIndicator,
      }}
    />
  );
}
