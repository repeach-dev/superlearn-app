import { FilterType } from "../../types/clip";

type Props = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export default function ClipFilterBar(props: Props): JSX.Element;
