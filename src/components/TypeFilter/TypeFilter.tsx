import FiltersSelect from "../FiltersSelect/FiltersSelect";
import { animalOptions } from "../../constants/animalOptions";

import type { OptionType } from "../../types/select";

export default function TypeFilter() {
  const options: OptionType[] = [
    { value: "", label: "Animal type" },
    ...animalOptions,
  ];

  return <FiltersSelect paramKey="type" options={options} />;
}
