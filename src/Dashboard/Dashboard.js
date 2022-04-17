import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryLabel,
} from "victory";
import { get } from "../Central-api/Usersapi";

export const Dashboard = () => {
  const history = useHistory("");
  if (localStorage.length === 0) {
    history.push("/");
  }

  console.log(localStorage.getItem("Name") + " " + "user name");
  const [displayData, setDisplayData] = useState([]);
  const getUserData = localStorage.getItem("Name");
  useEffect(() => {
    get(`/searchDetail/${getUserData}`)
      .then((response) => {
        var result = response.data;
        var newData = [];
        result.map((element, key) => {
          let data = {
            start: moment(element.start).format("DD-MM-YYYY"),
            finalTime: parseInt(element.totalHour),
          };
          newData.push(data);
        });

        setDisplayData(newData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    
      <div className="shadow mt-4 p-3 mb-5 bg-body rounded mx-auto w-75">
        <VictoryChart domainPadding={10}>
          <VictoryAxis
            label="Date"
            tickLabelComponent={<VictoryLabel style={{ fontSize: "7px" }} />}
          />

          <VictoryAxis
            dependentAxis
            label="Total Working Hours"
            tickLabelComponent={<VictoryLabel style={{ fontSize: "7px" }} />}
          />

          <VictoryStack colorScale={"blue"}>
            <VictoryBar
              barWidth={15}
              data={displayData}
              x="start"
              y="finalTime"
            />
          </VictoryStack>
        </VictoryChart>
      </div>
  
  );
};
