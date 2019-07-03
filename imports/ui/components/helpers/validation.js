export default function validate(values) {
  const errors = {};

  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.email) {
    errors.email = "required";
  } else if (!regex.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (!values.password.length < 5) {
    errors.password = "Password must have at least 5 characters";
  }
  if (!values.username) {
    errors.username = "Username is required";
  }
  return errors;
}
