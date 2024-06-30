import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { URI } from "../uri";
import VacationShow from "./VacationShow";
import VacationEdit from "./VacationEdit";
import Error from "./Error";
import Success from "./Success";

const Vacation = ({ item }) => {
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [toogleEdit, setToggleEdit] = useState(false);
  const [buttonName, setButtonName] = useState("Edycja");
  const [itemState, setItemState] = useState(item);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  if (cookie.token === undefined) {
    window.location.reload();
    navigate("/login");
  }

  const token = cookie.token;

  const handletoggleClick = () => {
    setToggleEdit((currentState) => !currentState);
    if (buttonName === "Edycja") {
      setButtonName("Podgląd");
    }
    if (buttonName === "Podgląd") {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      fetch(URI + "/events/" + item.id, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "OK") {
            setItemState(response.response);
            setMessage("");
            setIsError(false);
          } else {
            setMessage(response.message);
            setIsError(true);
          }
        });

      setButtonName("Edycja");
    }
  };
  return (
    <div>
      {toogleEdit ? (
        <VacationEdit item={itemState} />
      ) : (
        <VacationShow item={itemState} />
      )}
      <button onClick={handletoggleClick}>{buttonName}</button>
      {isError ? <Error message={message} /> : <Success message={message} />}
    </div>
  );
};
export default Vacation;
