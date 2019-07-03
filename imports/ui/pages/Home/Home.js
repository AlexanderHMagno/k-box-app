import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountForm from "../../components/siteLayout/AccountForm";
import clsx from "clsx";

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
        {/* <Typography gutterBottom className={classes.subheading}>
          K-Box
        </Typography> */}
        <img
          src={"http://www.kbktv.com/kbktv/images/kbox_logo_new.png"}
          alt="logo"
          className={clsx(classes.logo)}
        />
        <Typography className={classes.headline} />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography className={classes.type} gutterBottom>
          Karaoke. Dance. Celebrate.
        </Typography>
        <AccountForm />
      </Grid>
    </Grid>
  );
};

export default Home;
