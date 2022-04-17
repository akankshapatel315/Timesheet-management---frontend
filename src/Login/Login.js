import { React, useEffect, useState } from "react";
import swal from "sweetalert";
import { post } from "../Central-api/Usersapi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema, OnSubmit, initialValues } from "./loginSchema";

export const Login = () => {
  // const initalValue = () => window.localStorage.getItem("Name", "username");
  // const [name, setName] = useState(initalValue);

  // useEffect(() => {
  //   window.localStorage.setItem("Name", name);
  // }, [name]);

  const history = useHistory();

  return (
    <div className="mx-auto w-50">
      <div className="shadow mt-4 p-3 mb-5 bg-body rounded container">
        <center>
          <h2>Login</h2>
        </center>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, { resetForm }) => {
            // OnSubmit(values);
            // resetForm();

            if ({ loginSchema }) {
              const axiosPost = () => {
                return new Promise((resolve, reject) => {
                  post("users/login", values)
                    .then(function (response) {
                      if (response.status === 200) {
                        resolve(
                          swal(response.data.message, "", "success").then(
                            function () {
                              // window.location = "/dashboard";
                              history.push("/dashboard");
                            }
                          )
                        );

                        // setName(response.data.user.firstname);
                        localStorage.setItem(
                          "Name",
                          response.data.user.firstname
                        );
                        history.push("/dashboard");
                      } else {
                        reject(response);
                      }
                    })
                    .catch(function (error) {
                      if (error.response) {
                        if (error.response.status === 401) {
                          swal(error.response.data.message, "", "error");
                        } else {
                          swal(error.response.data.message, "", "error");
                        }
                      }
                    });
                });
              };
              axiosPost();
            }
          }}
        >
          {({ values }) => (
            <Form>
              <div className="container my-5 ">
                <div className="field mb-4">
                  <label className="label" htmlFor="email">
                    Email Address
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
                        <div style={{ color: "red" }}>{renderError}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="field mb-4">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <div className="control">
                    <Field
                      className="form-control"
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password">
                      {(renderError) => (
                        <div style={{ color: "red" }}>{renderError}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  //onClick={navigate}
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
