import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { URI } from "../uri";
import Vacation from "./Vacation";
import Error from "./Error";

const Vacations = ({ isAdmin, id, which }) => {
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [vacations, setVacations] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  if (cookie.token === undefined) {
    window.location.reload();
    navigate("/login");
  }

  const token = cookie.token;
  useEffect(() => {
    const options = {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    };
    fetch(URI + "/events", options)
      .then((resposne) => resposne.json())
      .then((response) => {
        if (response.status === "OK") {
          setVacations(response.response);
          setMessage("");
          setIsError(false);
        } else {
          setMessage(response.message);
          setIsError(true);
        }
      });
  }, [token]);

  return (
    <div>
      {which === "all"
        ? vacations.map((item) => <Vacation key={item.id} item={item} />)
        : which === "pending"
        ? vacations
            .filter((item) => item.status === "pending")
            .map((item) => <Vacation key={item.id} item={item} />)
        : which === "approved"
        ? vacations
            .filter((item) => item.status === "approved")
            .map((item) => <Vacation key={item.id} item={item} />)
        : which === "cancelled"
        ? vacations
            .filter((item) => item.status === "cancelled")
            .map((item) => <Vacation key={item.id} item={item} />)
        : null}
      {isError ? <Error message={message} /> : null}
    </div>
  );
};
export default Vacations;
