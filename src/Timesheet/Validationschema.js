import * as Yup from "yup";
const ValidationSchema = () =>
  Yup.object({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
   
    
  });

const initialValues = {
  inTime: "",
  outTime: "",
 
};

const OnSubmit = (values) => {
 
  alert(JSON.stringify(values, null, 2));
};
export { ValidationSchema, initialValues, OnSubmit };
