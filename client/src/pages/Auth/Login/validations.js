import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("geçerli bir email girin").required("zorunlu alan"),
  password: yup.string().min(5, "en az 5 karakter olmalı").required(),
});
export default validations;
