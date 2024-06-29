import React from "react";

const VacationShow = ({ item }) => {
  const {
    createdAt,
    dateFrom,
    dateTo,
    days,
    groupId,
    id,
    notice,
    reasonId,
    reasonName,
    status,
    updatedAt,
    userId,
  } = item;
  const statusesPL = [
    { status: "pending", value: "Oczekuje na zatwierdzenie" },
    { status: "approved", value: "Zaakceptowany" },
    { status: "cancelled", value: "Odrzucony" },
  ];

  return (
    <div>
      <p>
        Data rozpoczęcia: <b>{dateFrom}</b>
      </p>
      <p>
        Data zakończenia: <b>{dateTo}</b>
      </p>
      <p>
        Czas trwania: <b>{days} dni</b>
      </p>
      <p>
        Powód urlopu: <b>{reasonName}</b>
      </p>
      <p>
        Status urlopu:
        <b>{statusesPL.filter((item) => item.status === status)[0].value}</b>
      </p>
      <p>
        Utworzony: <b>{createdAt}</b>
      </p>
      <p>
        Zmodyfikowany: <b>{updatedAt}</b>
      </p>
    </div>
  );
};
export default VacationShow;
