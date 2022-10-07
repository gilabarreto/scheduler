import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const { name, spots, selected, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formatSpots = () => {
    if (spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    }
    if (spots === 1) {
      return <h3 className="text--light">1 spot remaining</h3>
    }
    return <h3 className="text--light">{spots} spots remaining</h3>
  }

  return (
    <li className={dayClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      {formatSpots()}
    </li>
  );
}