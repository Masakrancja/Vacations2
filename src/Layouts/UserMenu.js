import React from "react";
import Menu from "../Components/Menu";

const menuItems = [
  { id: "1", name: "Dodaj urlop", path: "/events/add", exact: "false" },
  { id: "2", name: "Moje urlopy", path: "/events", exact: "true" },
  {
    id: "3",
    name: "Urlopy oczekujące",
    path: "/events/waiting",
    exact: "false",
  },
  {
    id: "4",
    name: "Urlopy zatwierdzone",
    path: "/events/approved",
    exact: "false",
  },
  {
    id: "5",
    name: "Urlopy odrzucone",
    path: "/events/rejected",
    exact: "false",
  },
  { id: "6", name: "Moje konto", path: "/me", exact: "false" },
  { id: "7", name: "Wyloguj", path: "/logout", exact: "false" },
];

const UserMenu = () => {
  return <Menu items={menuItems} />;
};
export default UserMenu;
