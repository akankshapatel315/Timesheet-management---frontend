import React from "react";

export default function ControlButtons(props) {
  const StartButton = (
    <div className="btn btn-outline-success mx-5 " onClick={props.handleStart}>
      Start
    </div>
  );
  const ActiveButtons = (
    <div className="btn-grp">
      <div className="btn btn-outline-success" onClick={props.handleReset}>
        End
      </div>
      &nbsp;&nbsp;
      <div
        className="btn btn-outline-success"
        onClick={props.handlePauseResume}
      >
        {props.isPaused ? "Resume" : "Pause"}
      </div>
      &nbsp;&nbsp;
    </div>
  );

  return (
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  );
}
