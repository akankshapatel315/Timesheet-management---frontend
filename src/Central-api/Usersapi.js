import axios from "axios";
import { BASE_URL } from "../Env";

// registration and login api
const post = (reqUrl, values) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + reqUrl, values)

      .then(function (response) {
        console.log(response);

        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
const get = (reqUrl, values) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BASE_URL + "timesheet/" + reqUrl, values)

      .then(function (response) {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const deleteSheet = (reqUrl, start) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(BASE_URL + "timesheet/" + reqUrl + start)

      .then(function (response) {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const put = (reqUrl, value) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BASE_URL + "timesheet/" + reqUrl, value)

      .then(function (response) {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
export { post };
export { deleteSheet };
export { put };
export { get };
