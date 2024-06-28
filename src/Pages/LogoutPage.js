import { useCookies } from "react-cookie";

const LogoutPage = () => {
  const [, , removeCookie] = useCookies(["token"]);
  removeCookie("token", { path: "/" });
  window.location.reload();
};
export default LogoutPage;
