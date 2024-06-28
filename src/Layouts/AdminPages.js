import React from "react";
import { Routes, Route } from "react-router-dom";
import AllUsers from "../Pages/AllUsers";
import AllVacationsPage from "../Pages/AllVacationsPage";
import WaitingVacationsPage from "../Pages/WaitingVacationsPage";
import ApprovedVacationsPage from "../Pages/ApprovedVacationsPage";
import RejectedVacationsPage from "../Pages/RejectedVacationsPage";
import MyAccountPage from "../Pages/MyAccountPage";
import LogoutPage from "../Pages/LogoutPage";
import ErrorPage from "../Pages/ErrorPage";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/" Component={AllUsers} />
      <Route path="/users" Component={AllUsers} />
      <Route path="/events" Component={AllVacationsPage} />
      <Route path="/events/waiting" Component={WaitingVacationsPage} />
      <Route path="/events/approved" Component={ApprovedVacationsPage} />
      <Route path="/events/rejected" Component={RejectedVacationsPage} />
      <Route path="/me" Component={MyAccountPage} />
      <Route path="/logout" Component={LogoutPage} />
      <Route path="*" Component={ErrorPage} />
    </Routes>
  );
};
export default AdminPages;
