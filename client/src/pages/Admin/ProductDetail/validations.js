import * as yup from "yup";

const editScheme = yup.object().shape({
  title: yup.string().min(5).required("Name is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().min(5).required("Description is required"),
});
export default editScheme;
