import React, { useState } from "react";
import Data from "./Data";
import { useHistory } from "react-router-dom";

import "./register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ValidationSchema, initialValues, OnSubmit } from "./ValidationSchema";
import swal from "sweetalert";
import { post } from "../Central-api/Usersapi";

export const Register = () => {
  const history = useHistory();
  const navigate = () => {
    history.push("/login");
  };

  const labelStyle = { color: "red" };
  const [selectCountryErrorMessageFlag, setCountryFlag] = useState(false);
  const [selectStateErrorMessageFlag, setStateFlag] = useState(false);
  const [selectCityErrorMessageFlag, setCityFlag] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const availableState = Data.countries.find((c) => c.name === selectedCountry);
  const availableCities = availableState?.states?.find(
    (s) => s.name === selectedState
  );
  return (
    <div className="mx-auto col-md-8 offset-md-2">
      <div className="shadow mt-4 p-3 mb-5 bg-body rounded mx-auto">
        <center>
          <h2>Register</h2>
        </center>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={(values, { resetForm }) => {
            values.country = selectedCountry;
            values.state = selectedState;
            values.city = selectedCity;
            console.log(values);
            if ({ ValidationSchema } && values.technology.length != 0) {
              post("users/register", values).then((res) => {
                swal(res.data.message);
                navigate();
              });
            } else {
              alert("Invalid");
            }

            resetForm();
          }}
        >
          {() => (
            <Form>
              <div className="container  my-5">
                <div className="field mb-4">
                  <label className="label" htmlFor="firstname">
                    FirstName
                  </label>
                  <div className="control">
                    <Field
                      className="form-control"
                      name="firstname"
                      type="text"
                      placeholder="First name"
                    />
                    <ErrorMessage className="error" name="firstname">
                      {(renderError) => (
                        <div style={labelStyle}>{renderError}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="field  mb-4">
                  <label className="label" htmlFor="lastname">
                    LastName
                  </label>
                  <div className="control">
                    <Field
                      className="form-control"
                      name="lastname"
                      type="text"
                      placeholder="Last name"
                    />
                    <ErrorMessage name="lastname">
                      {(renderError) => (
                        <div style={labelStyle}>{renderError}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="field  mb-4">
                  <label className="label" htmlFor="lastname">
                    Phone
                  </label>
                  <div className="control">
                    <Field
                      className="form-control"
                      name="phone"
                      type="text"
                      placeholder="Phone"
                    />
                    <ErrorMessage name="phone">
                      {(renderError) => (
                        <div style={labelStyle}>{renderError}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="field  mb-4">
                  <label className="label" htmlFor="email">
                    Email address
                  </label>
                  <div className="control">
                    <Field
                      name="email"
                      type="text"
                      className="form-control"
                      placeholder="Email address"
                    />
                    <ErrorMessage name="email">
                      {(renderError) => (
                        <div style={labelStyle}>{renderError}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="field  mb-4">
                  <label className="label" htmlFor="country">
                    Country
                  </label>
                  <div className="control">
                    <select
                      className="form-select"
                      id="country"
                      name="country"
                      placeholder="Country"
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        if (e.target.value) {
                          setCountryFlag(false);
                        } else {
                          setCountryFlag(true);
                          setStateFlag(true);
                          setCityFlag(true);
                        }
                      }}
                    >
                      <option value="">--Choose Country--</option>
                      {Data.countries.map((item,index) => {
                        return <option key={item.index} value={item.name}>{item.name}</option>;
                      })}
                    </select>
                    {selectCountryErrorMessageFlag ? (
                      <p style={labelStyle}>Select Country!!!</p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
                <div className="field  mb-4">
                  <label className="label" htmlFor="state">
                    State
                  </label>
                  <div className="control">
                    <select
                      className="form-select"
                      name="state"
                      placeholder="State"
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        if (e.target.value) setStateFlag(false);
                        else {
                          setStateFlag(true);
                          setCityFlag(true);
                        }
                      }}
                    >
                      <option value="">--Choose State--</option>
                      {availableState?.states.map((e,index) => {
                        return <option value={e.name} key={e.index}>{e.name}</option>;
                      })}
                    </select>
                    {selectStateErrorMessageFlag ? (
                      <p style={labelStyle}>Select State!!!</p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
                <div className="field  mb-4">
                  <label className="label" htmlFor="city">
                    City
                  </label>
                  <div className="control">
                    <select
                      name="city"
                      className="form-select"
                      placeholder="City"
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        if (e.target.value) setCityFlag(false);
                        else setCityFlag(true);
                      }}
                    >
                      <option value="">--Choose City--</option>
                      {availableCities?.cities.map((e,index) => {
                        return <option key={e.index} value={e}>{e}</option>;
                      })}
                    </select>
                    {selectCityErrorMessageFlag ? (
                      <p style={labelStyle}>Select City!!!</p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
                <div className="field  mb-4">
                  <label className="label" htmlFor="position">
                    Position
                  </label>
                  <div className="control">
                    <Field
                      className="form-control"
                      name="position"
                      type="text"
                      placeholder="Position"
                    />
                    <ErrorMessage name="position">
                      {(renderError) => (
                        <div style={labelStyle}>{renderError}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="control">
                  <label className="label" htmlFor="technology">
                    Technology :
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    <Field
                      type="checkbox"
                      name="technology"
                      value="React Js"
                      className="me-2"
                    />
                    ReactJs
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    <Field
                      type="checkbox"
                      name="technology"
                      value="Java"
                      className="me-2"
                    />
                    Java
                  </label>{" "}
                  &nbsp;&nbsp;
                  <label>
                    <Field
                      type="checkbox"
                      name="technology"
                      value="Python"
                      className="me-2"
                    />
                    Python
                  </label>{" "}
                  <ErrorMessage name="technology">
                    {(renderError) => (
                      <div style={labelStyle}>{renderError}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="field  mb-4">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <div className="control">
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password">
                      {(renderError) => (
                        <div style={labelStyle}>{renderError}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="field  mb-4">
                  <label className="label" htmlFor="gender">
                    Gender
                  </label>
                  <div className="control">
                    <label>
                      <Field
                        type="radio"
                        name="gender"
                        value="Male"
                        className="me-2"
                      />
                      Male
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="gender"
                        value="Female"
                        className="mx-2"
                      />
                      Female
                    </label>
                    <ErrorMessage name="gender">
                      {(renderError) => (
                        <div style={labelStyle}>{renderError}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={(e) => {
                    if (selectedCountry == "") setCountryFlag(true);
                    if (selectedState == "") setStateFlag(true);
                    if (selectedCity == "") setCityFlag(true);
                  }}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
