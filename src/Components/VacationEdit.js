import React, { useState } from "react";

import SelectReasons from "./SelectReasons";

const VacationEdit = ({ item }) => {
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

  const [dateFromState, setDateFromState] = useState(dateFrom);
  const [dateToState, setDateToState] = useState(dateTo);
  const [reasonIdState, setReasonIdState] = useState(reasonId);

  const handleDateFrom = (e) => {
    setDateFromState(e.target.value);
  };

  const handleDateTo = (e) => {
    setDateToState(e.target.value);
  };

  const handleReasonIdChange = (e) => {
    setReasonIdState(e.target.value);
  };

  return (
    <div>
      <div>
        <label>
          Data rozpoczęcia:
          <input
            type="date"
            id="dateFrom"
            value={dateFromState}
            onChange={handleDateFrom}
          />
        </label>
      </div>
      <div>
        <label>
          Data zakończenia:
          <input
            type="date"
            id="dateTo"
            value={dateToState}
            onChange={handleDateTo}
          />
        </label>
      </div>
      <SelectReasons
        reasonId={reasonIdState}
        handleReasonIdChange={handleReasonIdChange}
      />
    </div>
  );
};
export default VacationEdit;
