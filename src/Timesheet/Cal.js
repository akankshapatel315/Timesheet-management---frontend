import React, { useState, useRef } from "react";

import "./bigcal.css";
import moment from "moment";
import { Modall } from "./Modall";
import { useEffect } from "react";
import swal from "sweetalert";

import { get, post, put, deleteSheet } from "../Central-api/Usersapi";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import Timer from "../Stopwatch/Timer";
import ControlButtons from "../Stopwatch/ControlButtons";
import { set } from "date-fns";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Cal = () => {
  const fetchDataDB = () => {
    get(`searchDetail/${getUserData}`)
      .then((response) => {
        var events = [];
        response.data.map((element, key) => {
          let record = {
            _id: element._id,
            start: element.start,
            outTime: element.outTime,
            inTime: element.inTime,
            end: element.end,
            title: element.totalHour,
          };
          events.push(record);
        });

        setAllEvents(events);
      })
      .catch((err) => console.log(err));
  };

  //Stopwatch timer
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  // var totalTime =
  //   Math.floor(time / (1000 * 60 * 60)) +
  //   ":" +
  //   (Math.floor(time / (1000 * 60)) % 60) +
  //   ":" +
  //   (Math.floor(time / 1000) % 60);

  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
        var date = new Date();
        var currentTime = moment(date).format("HH:mm A");  // time format using moment library
        var autoInsertTime = "12:00 AM";
        if (currentTime == autoInsertTime) {
          handleReset();  // button will turn into start button and sheet will be inserted automatically
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  //load user's sheets all data
  useEffect(() => {
    fetchDataDB();
  }, []);

  var [startTime, setStartTime] = useState(null);

  // start btn
  const handleStart = () => {
    // setBtnStarted(true);
    setIsActive(true);
    setIsPaused(false);
    setStartTime(new Date().toLocaleTimeString());
    console.log(time);
  };

  //resume
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  let [allEvents, setAllEvents] = useState([]);
  let [modalData, setModalData] = useState({});
  const [getUserData, setUserData] = useState(localStorage.getItem("Name"));
  // Time difference
  const timeDiff = (start, end) => {
    var duration = moment.duration(end.diff(start));
    var hours = parseInt(duration.asHours());
    var minutes = parseInt(duration.asMinutes()) % 60;
    var seconds = parseInt(duration.asSeconds()) % 60;
    const timeDifference = hours + ":" + minutes + ":" + seconds;
    return timeDifference;
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const insertData = () => {
    var endTime = new Date().toLocaleTimeString();
    var s = moment(startTime, "HH:mm:ss a");
    var e = moment(endTime, "HH:mm:ss a");

    const timeDifference = timeDiff(s, e);

    let sheet = {
      name: localStorage.getItem("Name"),
      // start: date1,
      //end: date1,
      inTime: startTime,
      outTime: endTime,
      title: timeDifference,
    };

    post("timesheet/insert", sheet)
      .then((res) => {
        swal(res.data.message, "", "success").then(() => {
          fetchDataDB();
        });
      })
      .catch((err) => {
        swal(err.response.data.message, "", "error").then(() => {
          fetchDataDB();
        });
      });
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    insertData();
  };

  const [startDate, setStartDate] = useState(null);

  const [eventInTime, seteventInTime] = useState(
    moment(new Date(), "hh:mm:ss a")
  );
  const [eventOutTime, seteventOutTime] = useState(
    moment(new Date(), "hh:mm:ss a")
  );
  const [eventTotalTime, seteventTotalTime] = useState("");

  function deleteData() 
  {
    swal({
      title: "Are you sure you want to Delete?",
      text: "",
      icon: "warning",
      buttons: true,
    }).then((Delete) => {
      if (Delete) {
        const start = modalData.start;

        deleteSheet("/delete/", start).then((res) => {
          swal(" successfully Deleted", {
            icon: "success",
          });
          setAllEvents(
            allEvents.filter((element) => element.start != modalData.start)
          );
          setShow(false);
        });
      }
    });
  }

  const updateData = () => {
    var flag = false;

    if (startDate === null || eventInTime._i === "" || eventOutTime._i === ""
    ) {
      swal("Fill all Data", "", "warning");
    } else {
      var currentDate = moment(modalData.start).format("YYYY-MM-DD").toString();
      var newDate = moment(startDate).format("YYYY-MM-DD").toString();

      var s = moment(eventInTime._i, "HH:mm:ss a");
      var e = moment(eventOutTime._i, "HH:mm:ss a");

      const timeDifference = timeDiff(s, e);
      var timeFlag = parseInt(timeDifference);
      if (timeFlag < 0) {
        return swal(
          "Update sheet with valid InTime and OutTime",
          "",
          "warning"
        );
      }

      if (currentDate != newDate) {
        allEvents.map((element) => {
          var storedDate = moment(element.start)
            .format("YYYY-MM-DD")
            .toString();
          if (storedDate == newDate && flag == false) {
            flag = true;
            return swal("Can not Modify on" + " " + storedDate, "", "warning");
          }
        });
      }
      if (flag) {
        return null;
      }
      let sheet = {
        _id: modalData._id,
        name: localStorage.getItem("Name"),
        start: startDate,
        end: startDate,
        inTime: eventInTime._i,
        outTime: eventOutTime._i,
        title: timeDiff(eventInTime, eventOutTime),
      };

      put("updateDetail/", sheet)
        .then((res) => {
          console.log("Then");
          if (res.status == 200) {
            console.log("Successfully updated");
            swal(" successfully updated"
            , {
              icon: "success",
            }
            )
            .then(() => {
              fetchDataDB();
            });
            setShow(false);
          }
        })
        .catch((err) => {
          console.log("Catch Called");
          if (err.res.status == 209)
            swal("Already Data exist", {
              icon: "warning",
            }).then(() => fetchDataDB());
          setShow(false);
        });
        
        // swal(" successfully updated" )
        
      // // alert("Are you Sure You want To update?");
    }
  };

  const selectEvent = (e) => {
    setStartDate(new Date(e.start));
    seteventInTime(moment(e.inTime, "hh:mm:ss a"));
    seteventOutTime(moment(e.outTime, "hh:mm:ss a"));
    seteventTotalTime(e.title);
    setShow(true);
    console.log(e._id);
    setModalData({
      _id: e._id,
      start: e.start,
      end: e.end,
      title: e.title,
      inTime: e.inTime,
      outTime: e.outTime,
    });
  };
  return (
    <div className="mx-auto w-50">
      <Timer time={time} />
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />

      <div className="shadow mt-4 p-3 mb-5 bg-body rounded mx-auto">
        <Calendar
          localizer={localizer}
          events={allEvents}
          popup
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectEvent={selectEvent}
          style={{ height: 500 }}
        />
      </div>
      <Modall
        show={show}
        startDate={startDate}
        handleClose={handleClose}
        setStartDate={setStartDate}
        updateData={updateData}
        seteventInTime={seteventInTime}
        seteventOutTime={seteventOutTime}
        eventInTime={eventInTime._i}
        eventOutTime={eventOutTime._i}
        eventTotalTime={eventTotalTime}
        deleteData={deleteData}
      />
    </div>
  );
};
export default Cal;
