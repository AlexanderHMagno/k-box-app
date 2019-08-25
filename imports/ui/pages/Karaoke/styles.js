const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    background: theme.palette.primary.main,
    padding: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(20)
    }
  }
});

export default styles;
