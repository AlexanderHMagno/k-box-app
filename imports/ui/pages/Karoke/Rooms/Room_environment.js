import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Links } from "../../../../api/links";

const track_list = Links.find().fetch();
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, "16 Mar, 2019", "Hey Baby", "Elvis Presley", "Alex", "3:44"),
  createData(
    1,
    "16 Mar, 2019",
    "Yellow Submarine",
    "Paul McCartney",
    "Ying",
    "4:25"
  ),
  createData(2, "16 Mar, 2019", "Dancing", "Tom Scholz", "Zareef", "4:20"),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Michael Jackson",
    "Tien",
    "3:40"
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Naturia",
    "Bruce Springsteen",
    "Natalia",
    "2:25"
  )
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Comming Soon</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Singer </TableCell>
            <TableCell align="right">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="secondary" href="javascript:;">
          Add More Songs!
        </Link>
      </div>
    </React.Fragment>
  );
}
