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
import validate from "../helpers/validation";
import { Links, Rooms } from "../../../api/links";
import { FORM_ERROR } from "final-form";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Form
        onSubmit={values => {
          return new Promise((resolve, reject) => {
            if (this.state.formToggle) {
              Meteor.loginWithPassword(values.email, values.password, er => {
                if (er) {
                  resolve({
                    [FORM_ERROR]: "Incorrect Email or Password"
                  });
                  return;
                }
                resolve();
              });
            } else {
              Accounts.createUser(values, er => {
                if (er) {
                  resolve({
                    [FORM_ERROR]: "Account already exists"
                  });
                  return;
                }
                const user_id = Meteor.userId();
                Links.insert({
                  _id: user_id,
                  username: values.username,
                  email: values.email,
                  favorites: [],
                  friends: [],
                  rooms: []
                });

                //Creates Favorites Room...
                Rooms.insert({
                  name: "Favorites",
                  image:
                    "https://cdn.pixabay.com/photo/2016/02/05/19/51/stained-glass-1181864_1280.jpg",
                  bio: "My favorite songs",
                  users: [{ user: user_id }],
                  tracks: [],
                  administrator: {
                    _id: user_id,
                    username: Meteor.user().username
                  },
                  password: user_id,
                  public: "no",
                  favorite_room: "yes"
                });
                resolve();
                return;
              });
            }
          });
        }}
        validate={validate}
        render={({
          handleSubmit,
          pristine,
          invalid,
          form,
          submitting,
          submitError
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              {!this.state.formToggle && (
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.inputLabel} htmlFor="username">
                    Username
                  </InputLabel>

                  <Field
                    name="username"
                    render={({ input, meta }) => (
                      <>
                        <Input
                          {...input}
                          id="username"
                          type="text"
                          className={classes.inputStyle}
                          inputProps={{
                            autoComplete: "off"
                          }}
                          value={input.value}
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              )}
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={classes.inputLabel} htmlFor="email">
                  Email
                </InputLabel>
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <>
                      <Input
                        {...input}
                        id="email"
                        input="text"
                        className={classes.inputStyle}
                        inputProps={{
                          autoComplete: "off"
                        }}
                        value={input.value}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </>
                  )}
                />
              </FormControl>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={classes.inputLabel} htmlFor="password">
                  Password
                </InputLabel>
                <Field
                  type="password"
                  name="password"
                  render={({ input, meta }) => (
                    <>
                      <Input
                        {...input}
                        className={classes.inputStyle}
                        id="password"
                        inputProps={{
                          autoComplete: "off"
                        }}
                        value={input.value}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </>
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
                    disabled={pristine || invalid}
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
              {submitError && (
                <Typography className={classes.errorMessage}>
                  {submitError}
                </Typography>
              )}
            </form>
          );
        }}
      />
    );
  }
}

AccountForm.propType = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountForm);
