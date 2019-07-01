import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function Deposits(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Description</Title>
      <Typography component="p" variant="subtitle2" style={{ height: "50%" }}>
        {props.bio}
      </Typography>
      {/* If user is the same as the admin */}
      {Meteor.userId() === props.admin._id && (
        <div>
          <Typography color="textSecondary" className={classes.depositContext}>
            Password:{props.password}
          </Typography>
          <Typography color="secondary" className={classes.depositContext}>
            You are the Admin
          </Typography>
        </div>
      )}
      {/* If user is diffent than the admin */}
      {Meteor.userId() !== props.admin._id && (
        <div>
          <Typography color="textSecondary" className={classes.depositContext}>
            Password: Contact the Admin.
          </Typography>
          <Typography color="secondary" className={classes.depositContext}>
            Admin : {props.admin.username}
          </Typography>
        </div>
      )}
      <div>
        <Link color="primary" href="javascript:;">
          View Participants
        </Link>
      </div>
    </React.Fragment>
  );
}
