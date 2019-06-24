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
      <Typography component="p" variant="subtitle2">
        {props.bio}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext} />
      <div>
        <Link color="primary" href="javascript:;">
          View Participants
        </Link>
      </div>
    </React.Fragment>
  );
}
