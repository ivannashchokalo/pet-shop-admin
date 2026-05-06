import { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import Icon from "../Icon/Icon";
import styles from "./DropdownIndicator.module.scss";
import type { OptionType } from "../../types/select";
import clsx from "clsx";

export default function DropdownIndicator(
  props: DropdownIndicatorProps<OptionType, false>,
) {
  const { menuIsOpen } = props.selectProps; // об’єкт props від react-select

  return (
    <components.DropdownIndicator {...props}>
      <Icon
        name="arrow"
        size={24}
        className={clsx(styles.arrow, menuIsOpen && styles.open)}
      />
    </components.DropdownIndicator>
  );
}
