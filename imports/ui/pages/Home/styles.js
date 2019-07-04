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

  motto: {
    color: "white",
    marginLeft: "30%"
  },

  container: {
    display: "flex",
    padding: "95px"
  }
});

export default styles;
