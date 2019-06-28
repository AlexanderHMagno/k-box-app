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
import { Links } from "../../../api/links";

import { withRouter } from "react-router-dom";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  render() {
    const { classes } = this.props;
    // console.log(`current meteor user is ${Meteor.user()}`);
    return (
      <Form
        onSubmit={values => {
          if (this.state.formToggle) {
            Meteor.loginWithPassword(values.email, values.password, er => {
              if (er) {
                throw new Meteor.Error("Inccorrect Email or Password");
              }
            });
          } else {
            Accounts.createUser(values, er => {
              if (er) {
                throw new Meteor.Error("Existing Account already exists");
              } else {
                //Creates de user account
                Links.insert({
                  _id: Meteor.userId(),
                  username: values.username,
                  email: values.email,
                  favorites: [],
                  friends: [],
                  addFriends: [],
                  friendRequests: [],
                  rooms: []
                });
              }
            });
          }
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
              <FormControl fullWidth className={classes.formControl}>
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
                type="password"
                name="password"
                render={({ input, meta }) => (
                  <Input
                    id="password"
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
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(AccountForm));
