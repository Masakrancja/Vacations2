import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import SelectReasons from "../Components/SelectReasons";
import RegisterEvent from "../Components/RegisterEvent";
import { URI } from "../uri";
import Error from "../Components/Error";
import Success from "../Components/Success";

const AddVacationPage = () => {
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();
  if (cookie.token === undefined) {
    window.location.reload();
  }

  let date = new Date();
  const datefrom =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 > 9
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate());

  date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  const dateto =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 > 9
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate());

  const [reasonId, setReasonId] = useState(0);
  const [dateFrom, setDateFrom] = useState(datefrom);
  const [dateTo, setDateTo] = useState(dateto);
  const [notice, setNotice] = useState("");

  const [message, setMessage] = useState("");
  const [register, setRegister] = useState(false);

  const handleReasonIdChange = (e) => {
    setReasonId(e.target.value);
  };

  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
  };

  const handleNoticeChange = (e) => {
    setNotice(e.e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    let hasError = false;

    //Jakaś walidacja po stronie frontu
    if (cookie.token === undefined) {
      hasError = true;
      setMessage("Sesja wysgasła. Zaloguj się ponownie");
    }

    if (!hasError) {
      const options = {
        method: "POST",
        headers: { Authorization: "Bearer " + cookie.token },
        body: JSON.stringify({ reasonId, dateFrom, dateTo, notice }),
      };

      fetch(URI + "/events", options)
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "OK") {
            setRegister(true);
            setMessage("Urlop został utworzony");
            clearEventForm();
            return navigate("/events/waiting");
          } else {
            setRegister(false);
            setMessage(response.message);
          }
        });
    }
  };

  const clearEventForm = () => {
    setReasonId(0);
    setDateFrom("");
    setDateTo("");
    setNotice("");
  };

  return (
    <div>
      <h1>Dodaj urlop</h1>
      <form onSubmit={handleSubmit}>
        <SelectReasons
          reasonId={reasonId}
          handleReasonIdChange={handleReasonIdChange}
        />
        <RegisterEvent
          dateFrom={dateFrom}
          dateTo={dateTo}
          notice={notice}
          handleDateFromChange={handleDateFromChange}
          handleDateToChange={handleDateToChange}
          handleNoticeChange={handleNoticeChange}
        />
        <button type="submit">Utwórz</button>
      </form>
      {register ? <Success message={message} /> : <Error message={message} />}
    </div>
  );
};
export default AddVacationPage;
