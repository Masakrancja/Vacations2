import React from "react";
import Error from "./Error";
import Success from "./Success";

const ConfirmRegister = ({ message, registered }) => {
  return (
    <div>
      <button>Rejestruj</button>
      {registered ? <Success message={message} /> : <Error message={message} />}
    </div>
  );
};
export default ConfirmRegister;
