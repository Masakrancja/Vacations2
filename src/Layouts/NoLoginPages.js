import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import GroupsPage from "../Pages/GroupsPage";
import ErrorPage from "../Pages/ErrorPage";

const NoLoginPages = () => {
  return (
    <Routes>
      <Route path="/" Component={LoginPage} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/logout" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
      <Route path="/groups" Component={GroupsPage} />
      <Route path="*" Component={ErrorPage} />
    </Routes>
  );
};
export default NoLoginPages;
