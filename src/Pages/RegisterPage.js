import React, { useState } from "react";
import { URI } from "../uri";

import RegisterData from "../Components/RegisterData";
import IsAdmin from "../Components/IsAdmin";
import RegisterGroupData from "../Components/RegisterGroupData";
import SelectGroups from "../Components/SelectGroups";
import ConfirmRegister from "../Components/ConfirmRegister";

const RegisterPage = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupAddress, setGroupAddress] = useState("");
  const [groupPostalCode, setGroupPostalCode] = useState("");
  const [groupCity, setGroupCity] = useState("");
  const [groupNip, setGroupNip] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handlePass2Change = (e) => {
    setPass2(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupAddressChange = (e) => {
    setGroupAddress(e.target.value);
  };

  const handleGroupPostalCodeChange = (e) => {
    setGroupPostalCode(e.target.value);
  };

  const handleGroupCityChange = (e) => {
    setGroupCity(e.target.value);
  };

  const handleGroupNipChange = (e) => {
    setGroupNip(e.target.value);
  };

  const handleChecked = (e) => {
    setMessage("");
    if (e.target.id === "isAdmin") {
      setIsAdmin(e.target.checked);
    } else {
      setIsAdmin(!e.target.checked);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    let hasError = false;
    if (pass !== pass2) {
      hasError = true;
      setMessage("Podane hasła się różnią. Wpisz ponownie poprawne");
    }

    if (!hasError) {
      const newUser = {
        login,
        pass,
        pass2,
        isAdmin,
        groupId: selectedGroup,
        userData: {
          firstName,
          lastName,
          address,
          postalCode,
          city,
          phone,
          email,
        },
        group: {
          name: groupName,
          address: groupAddress,
          postalCode: groupPostalCode,
          city: groupCity,
          nip: groupNip,
        },
      };

      const options = {
        method: "POST",
        body: JSON.stringify(newUser),
      };
      fetch(URI + "/users", options)
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "OK") {
            const { firstName, lastName } = newUser.userData;
            setRegistered(true);
            setMessage(`Konto dla ${firstName} ${lastName} zostało utworzone`);
            clearRegisterForm();
          } else {
            setRegistered(false);
            setMessage(response.message);
          }
        });
    }
  };

  const clearRegisterForm = () => {
    setLogin("");
    setPass("");
    setPass2("");
    setIsAdmin(false);
    setSelectedGroup(0);
    setFirstName("");
    setLastName("");
    setAddress("");
    setPostalCode("");
    setCity("");
    setPhone("");
    setEmail("");
    setGroupName("");
    setGroupAddress("");
    setGroupPostalCode("");
    setGroupCity("");
    setGroupNip("");
  };

  return (
    <div>
      <h1>Rejestracja</h1>
      <form onSubmit={handleSubmit}>
        <RegisterData
          login={login}
          pass={pass}
          pass2={pass2}
          firstName={firstName}
          lastName={lastName}
          address={address}
          postalCode={postalCode}
          city={city}
          phone={phone}
          email={email}
          handleLoginChange={handleLoginChange}
          handlePassChange={handlePassChange}
          handlePass2Change={handlePass2Change}
          handleFirstNameChange={handleFirstNameChange}
          handleLastNameChange={handleLastNameChange}
          handleAddressChange={handleAddressChange}
          handlePostalCodeChange={handlePostalCodeChange}
          handleCityChange={handleCityChange}
          handlePhoneChange={handlePhoneChange}
          handleEmailChange={handleEmailChange}
        />
        <IsAdmin isAdmin={isAdmin} handleChecked={handleChecked} />
        {isAdmin ? (
          <RegisterGroupData
            name={groupName}
            address={groupAddress}
            postalCode={groupPostalCode}
            city={groupCity}
            nip={groupNip}
            handleNameChange={handleGroupNameChange}
            handleAddressChange={handleGroupAddressChange}
            handlePostalCodeChange={handleGroupPostalCodeChange}
            handleCityChange={handleGroupCityChange}
            handleNipChange={handleGroupNipChange}
          />
        ) : (
          <SelectGroups
            selectedGroup={selectedGroup}
            handleSelectChange={handleSelectChange}
          />
        )}
        <ConfirmRegister message={message} registered={registered} />
      </form>
    </div>
  );
};
export default RegisterPage;
