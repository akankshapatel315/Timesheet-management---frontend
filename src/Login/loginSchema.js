import * as Yup from "yup";

const loginSchema = () =>
  Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
const initialValues = {
  email: "",
  password: "",
};

const OnSubmit = (values) => {
  alert(JSON.stringify(values, null, 2));
};
export { loginSchema, initialValues, OnSubmit };
