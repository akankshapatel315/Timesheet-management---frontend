import * as Yup from "yup";

const ValidationSchema = () =>
  Yup.object({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    phone: Yup.string()
      .min(10, "should be 10 digits")
      .max(10, "should not exceed 10 characters")
      .required("Phone is Required"),
    email: Yup.string().email().required(),
    country: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    position: Yup.string().required(),
    password: Yup.string().required(),
    gender: Yup.string().required(),
    technology: Yup.array().min(1, "Select atleast one Technology"),
  });

const initialValues = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  country: "",
  state: "",
  city: "",
  gender: "",
  technology: [],
  position: "",
  password: "",
};

const OnSubmit = (values) => {
  console.log(values.technology);
  alert(JSON.stringify(values, null, 2));
};
export { ValidationSchema, initialValues, OnSubmit };
