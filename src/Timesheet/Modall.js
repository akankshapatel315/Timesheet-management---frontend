import DatePicker from "react-datepicker";
import { useState } from "react";
import React from "react";

import moment from "moment";
import { Modal } from "react-bootstrap";

export const Modall = (props) => {
  

  return (
    <div>
      <Modal show={props.show} style={{ width: "100%", padding: "25px 20px" }}>
        <button
          onClick={props.handleClose}
          style={{marginLeft:"375px"}}
          className="btn btn-outline-secondary  w-20 "
        >
          Close
        </button>
        <form onSubmit={props.updateData}>
          <div
            className="container"
            style={{ width: "300px", height: "530px", padding: "25px 20px" }}
          >
            <label className="mb-2">StartDate </label>
            <DatePicker
        
              dateFormat="yyyy - MM - dd"
              selected={props.startDate}
              className="form-control"
              onChange={(date) => {
                props.setStartDate(date);
              }}
            />
            <label className="mt-2">End Date </label>
            <DatePicker
              disabled
              dateFormat="yyyy - MM - dd"
              timeFormat="hh:mm:ss aa"
              className="form-control"
              selected={props.startDate}
              onChange={(date) => props.setStartDate(date)}
            />
            <label className="mt-2">In Time </label>
            <br />
            <input
              pattern="\d{1,2}:\d{1,2}:\d{1,2} [AP]M$"
              // pattern="(0?[1-9]|1[0-2]):([0-5]\d)? ([0-5]\d)\s?(AM|A\.M\.|am|a\.m\.|PM|P\.M\.|pm|p\.m\.)"
              type="text"
              format="hh:mm:ss a"
              showSecond={true}
              className="form-control"
              defaultValue={props.eventInTime}
              onChange={(time) => {
                props.seteventInTime(moment(time.target.value, "hh:mm:ss a"));
              }}
            />
            <br />

            <label>OutTime </label>
            <br />
            <input
              // pattern="(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|A\.M\.|am|a\.m\.|PM|P\.M\.|pm|p\.m\.)"
              pattern="\d{1,2}:\d{1,2}:\d{1,2} [AP]M$"
              type="text"
              format="hh:mm:ss a"
              showSecond={true}
              className="form-control"
              defaultValue={props.eventOutTime}
              onChange={(time) => {
                props.seteventOutTime(moment(time.target.value, "hh:mm:ss a"));
              }}
            />
            <br />
            <label>Total Time </label>
            <br />
            <input
              type="text"
              disabled
              className="form-control"
              defaultValue={props.eventTotalTime}
            />

            <button className="btn btn-success m-1">Update</button>
            <br />
          </div>
        </form>

        <div style={{ marginLeft: "40%", marginTop: "-123px" }}>
          {/* <button className="btn btn-primary m-1" onClick={props.updateData}>
            Update
          </button> */}
          <button className="btn btn-danger m-1" onClick={props.deleteData}>
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};
