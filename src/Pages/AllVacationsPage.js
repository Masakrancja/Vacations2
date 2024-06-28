import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../AppContext";
import Vacations from "../Components/Vacations";

const MyVacationPage = () => {
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const me = useContext(AppContext);
  if (cookie.token === undefined) {
    window.location.reload();
    navigate("/login");
  }

  const { isAdmin, id } = me;
  return (
    <>
      <Vacations isAdmin={isAdmin} id={id} which="all" />
    </>
  );
};
export default MyVacationPage;
