const styles = () => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    background: "black",
    "& label.Mui-focused": {
      color: "white"
    }
  },
  headline: {
    fontWeight: 700,
    color: "white"
  },
  subheading: {
    fontWeight: 400,
    fontSize: "200px",
    color: "white"
  },

  type: {
    color: "white"
  },

  logo: {
    height: "500px",
    width: "500px"
  }
});

export default styles;
