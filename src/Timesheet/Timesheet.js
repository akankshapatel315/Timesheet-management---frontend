import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DateTimePicker from "react-datetime-picker";
import Cal from "./Cal";

export const Timesheet = () => {
  const history = useHistory("");
  if (localStorage.length === 0) {
    history.push("/");
  }
  return (
    <div>
      <Cal />
    </div>
  );
};
