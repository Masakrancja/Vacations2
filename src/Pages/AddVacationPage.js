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
    //navigate("/login");
  }

  const [reasonId, setReasonId] = useState(0);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [notice, setNotice] = useState("");

  const [message, setMessage] = useState("");
  const [register, setRegister] = useState(false);

  const event = {
    reasonId: 0,
    dateFrom: "",
    dateTo: "",
    notice: "",
  };

  const handleReasonIdChange = (e) => {
    const value = Number(e.target.value);
    event.reasonId = value;
    setReasonId(value);
  };

  const handleDateFromChange = (e) => {
    const value = e.target.value;
    event.dateFrom = value;
    setDateFrom(value);
  };

  const handleDateToChange = (e) => {
    const value = e.target.value;
    event.dateTo = value;
    setDateTo(value);
  };

  const handleNoticeChange = (e) => {
    const value = e.target.value;
    event.notice = value;
    setNotice(e.value);
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
        body: JSON.stringify(event),
      };

      fetch(URI + "/events?token=" + cookie.token, options)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
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
