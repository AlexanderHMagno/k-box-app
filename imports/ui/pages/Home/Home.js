import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountForm from "../../components/siteLayout/AccountForm";

const Home = ({ classes }) => {
  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} sm={12} md={6}>
        <Typography gutterBottom className={classes.subheading}>
          K-Box
        </Typography>
        <Typography className={classes.headline} />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography gutterBottom>Welcome home.</Typography>
        <AccountForm />
      </Grid>
    </Grid>
  );
};

export default Home;
