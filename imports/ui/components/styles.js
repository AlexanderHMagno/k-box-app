const styles = theme => ({
  formControl: {
    display: "flex",
    marginBottom: theme.spacing(2),
    width: "50%",
    color: "firebrick"
  },

  underline: {
    borderBottom: "2px solid green"
  },
  formButton: {
    "&:disabled": {
      backgroundColor: "firebrick",
      color: "white"
    },
    marginTop: theme.spacing(2),
    color: "firebrick",
    backgroundColor: "white",
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
