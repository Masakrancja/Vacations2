import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { URI } from "../uri";
import SelectReasons from "./SelectReasons";
import Error from "./Error";
import Success from "./Success";

const VacationEdit = ({ item }) => {
  const {
    // createdAt,
    dateFrom,
    dateTo,
    // days,
    // groupId,
    // id,
    // notice,
    reasonId,
    // reasonName,
    // status,
    // updatedAt,
    // userId,
  } = item;
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [dateFromState, setDateFromState] = useState(dateFrom);
  const [dateToState, setDateToState] = useState(dateTo);
  const [reasonIdState, setReasonIdState] = useState(reasonId);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  if (cookie.token === undefined) {
    window.location.reload();
    navigate("/login");
  }

  const token = cookie.token;

  const handleDateFrom = (e) => {
    setDateFromState(e.target.value);
  };

  const handleDateTo = (e) => {
    setDateToState(e.target.value);
  };

  const handleReasonIdChange = (e) => {
    setReasonIdState(e.target.value);
  };

  const handleButtonZapisz = () => {
    const options = {
      method: "PATCH",
      headers: { Authorization: "Bearer " + token },
      body: JSON.stringify({
        dateFrom: dateFromState,
        dateTo: dateToState,
        reasonId: reasonIdState,
      }),
    };
    fetch(URI + "/events/" + item.id, options)
      .then((resposne) => resposne.json())
      .then((response) => {
        if (response.status === "OK") {
          setMessage("Poprawnie edytowano urlop");
          setIsError(false);
        } else {
          setMessage(response.message);
          setIsError(true);
        }
      });
  };

  return (
    <div>
      <div>
        <label>
          Data rozpoczęcia:
          <input
            type="date"
            id="dateFrom"
            value={dateFromState}
            onChange={handleDateFrom}
          />
        </label>
      </div>
      <div>
        <label>
          Data zakończenia:
          <input
            type="date"
            id="dateTo"
            value={dateToState}
            onChange={handleDateTo}
          />
        </label>
      </div>
      <SelectReasons
        reasonId={reasonIdState}
        handleReasonIdChange={handleReasonIdChange}
      />
      <button onClick={handleButtonZapisz}>Zapisz</button>
      {isError ? <Error message={message} /> : <Success message={message} />}
    </div>
  );
};
export default VacationEdit;
