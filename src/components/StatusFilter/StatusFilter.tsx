import FiltersSelect from "../FiltersSelect/FiltersSelect";

import type { OptionType } from "../../types/select";

export default function StatusFilter() {
  const options: OptionType[] = [
    { value: "", label: "Animal status" },
    { value: "available", label: "Available" },
    { value: "reserved", label: "Reserved" },
    { value: "sold", label: "Sold" },
  ];

  return <FiltersSelect paramKey="status" options={options} />;
}
