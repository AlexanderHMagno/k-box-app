import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountForm from "../../components/siteLayout/AccountForm";

const Home = ({ classes }) => {
  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid className={classes.container}>
        <img
          src={"http://www.kbktv.com/kbktv/images/kbox_logo_new.png"}
          alt="logo"
          className={classes.logo}
        />
      </Grid>
      <Grid>
        <Typography className={classes.motto} gutterBottom>
          Karaoke. Dance. Celebrate.
        </Typography>
        <AccountForm />
      </Grid>
    </Grid>
  );
};

export default Home;
