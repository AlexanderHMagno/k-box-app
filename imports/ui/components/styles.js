const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing(2),
    width: "60%",
    color: "firebrick",
    marginLeft: "19%"
  },

  underline: {
    borderBottom: "2px solid green"
  },
  formButton: {
    "&:disabled": {
      backgroundColor: "grey",
      color: "white"
    },
    marginTop: theme.spacing(2),
    color: "white",
    backgroundColor: "firebrick",
    "&:hover": {
      backgroundColor: "firebrick",
      color: "white"
    }
  },

  formToggle: {
    background: "none",
    border: "none",
    color: "white",
    textDecoration: "underline",
    "&:hover": {
      cursor: "pointer"
    }
  },
  accountForm: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "400px"
    }
  },
  errorMessage: {
    color: "firebrick"
  },

  inputStyle: {
    color: "white",
    borderBottom: " 2px solid maroon",
    "&:after": {
      borderBottom: " 2px solid maroon"
    }
  },

  inputLabel: {
    color: "white"
  }
});

export default styles;
