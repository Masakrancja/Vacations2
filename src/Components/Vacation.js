import React, { useState } from "react";

import VacationShow from "./VacationShow";
import VacationEdit from "./VacationEdit";

const Vacation = ({ item }) => {
  const [toogleEdit, setToggleEdit] = useState(false);
  const [buttonName, setButtonName] = useState("Edytuj");

  const handletoogClick = () => {
    setToggleEdit((currentState) => !currentState);
    if (buttonName === "Edytuj") {
      setButtonName("Zapisz");
    }
    if (buttonName === "Zapisz") {
      setButtonName("Edytuj");
    }
  };
  return (
    <div>
      {toogleEdit ? <VacationEdit item={item} /> : <VacationShow item={item} />}
      <button onClick={handletoogClick}>{buttonName}</button>
    </div>
  );
};
export default Vacation;
