import React from "react";
import Title from "./Title";
import Link from "@material-ui/core/Link";

export default function Chart(props) {
  return (
    <React.Fragment>
      <Link
        color="secondary"
        onClick={() => props.return("returned")}
        style={{ cursor: "pointer" }}
      >
        Go Back
      </Link>
      <h1>{props.title}</h1>
    </React.Fragment>
  );
}
