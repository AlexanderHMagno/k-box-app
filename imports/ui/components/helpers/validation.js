export default function validate(values) {
  const errors = {};
  let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.email) {
    errors.email = "required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (values.username && !values.username) {
    errors.username = "Required";
  }
  return errors;
}
