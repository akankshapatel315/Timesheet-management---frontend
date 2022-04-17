import React from "react";

export default function Timer(props) {
  // if (props.time == 100) {
  //   alert("this");
  // }
  return (
    <div className="timer mx-5">
      <span className="digits">
        {("0" + Math.floor(props.time / 3600)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor(Math.floor(props.time / 60) % 60)).slice(-2)}:
      </span>
      <span className="digits mili-sec">
        {("0" + Math.floor(props.time % 60)).slice(-2)}
      </span>
    </div>
  );
}
