import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Form, Field } from "react-final-form";
import PropTypes from "prop-types";
import styles from "../styles";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
//import { Accounts } from "meteor/accounts-base";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

class AccountForm extends Component {
  constructor(props) {
    console.log(props, "proppy");
    super(props);
    this.state = {
      formToggle: true,
      loggedIn: false
    };
  }

  redirectToProfile = () => {
    const { history } = this.props;
    if (history) history.push("/profile");
  };

  // componentWillMount() {
  //   // will trigger the callback function whenever a new Route renders a component(as long as this component stays mounted as routes change)
  //   this.props.history.listen(() => {
  //     // view new URL
  //     console.log("New URL", this.props.history.location.pathname);
  //   });
  // }

  render() {
    const { classes } = this.props;

    console.log("this", window.location);

    return (
      <Form
        onSubmit={values => {
          console.log(values, "this is values");
          // Accounts.createUser(values, er => {
          //   if (er) {
          //     throw new Meteor.Error("Existing Account already exists");
          //   } else {
          //     window.history.pushState(null, null, "/profile");
          //     window.history.go();
          //     // ()=> history.push("/profile")
          //   }
          // });
          //   Meteor.loginWithPassword(values, () => history.push("/profile"));
          Meteor.loginWithPassword(values.email, values.password, function(er) {
            if (er) {
              throw new Meteor.Error(
                "Inccorrect User or Password",
                "Inccorrect User or Password"
              );
            } else {
              window.history.pushState({}, "", "/profile");
              window.history.go();
              // window.location.reload();
              //  () => history.push("/profile");
              // this.redirectToProfile;
              // console.log("opps");
              return event.preventDefault();
            }
          });

          Accounts.createUser(values, er => {
            if (er) {
              throw new Meteor.Error("Existing Account already exists");
            } else {
              window.history.pushState(null, null, "/profile");
              window.history.go();
              // ()=> history.push("/profile")
            }
          });
        }}
        render={({
          handleSubmit,
          pristine,
          invalid,
          form,
          submitting,
          submitError,
          hasSubmitErrors
        }) => (
          <form onSubmit={handleSubmit}>
            {!this.state.formToggle && (
              <FormControl fullWidth>
                <InputLabel htmlFor="fullname">Username</InputLabel>

                <Field
                  name="username"
                  render={({ input, meta }) => (
                    <Input
                      id="username"
                      type="text"
                      inputProps={{
                        ...input,
                        autoComplete: "off"
                      }}
                      value={input.value}
                    />
                  )}
                />
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Field
                name="email"
                render={({ input, meta }) => (
                  <Input
                    id="email"
                    type="text"
                    inputProps={{
                      ...input,
                      autoComplete: "off"
                    }}
                    value={input.value}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Field
                name="password"
                render={({ input, meta }) => (
                  <Input
                    id="password"
                    type="password"
                    inputProps={{
                      ...input,
                      autoComplete: "off"
                    }}
                    value={input.value}
                  />
                )}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={submitting || pristine || invalid}
                >
                  {this.state.formToggle ? "Enter" : "Create Account"}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      form.reset();
                      this.setState({
                        formToggle: !this.state.formToggle
                      });
                    }}
                  >
                    {this.state.formToggle
                      ? "Create an account."
                      : "Login to existing account."}
                  </button>
                </Typography>
              </Grid>
            </FormControl>
            {hasSubmitErrors && (
              <Typography className={classes.errorMessage}>
                {submitError}
              </Typography>
            )}
          </form>
        )}
      />
    );
  }
}

AccountForm.propType = {
  classes: PropTypes.object.isRequired,
  loginMutation: PropTypes.func,
  signupMutation: PropTypes.func
};
export default withStyles(styles)(AccountForm);
//export default withRouter(connect()(withStyles(styles)(AccountForm)));
// export default withRouter(AccountForm);
