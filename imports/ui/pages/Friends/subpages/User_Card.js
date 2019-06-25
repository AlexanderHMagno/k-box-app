import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Check from "@material-ui/icons/Check";
import { Links } from "../../../../api/links";

const MySwal = withReactContent(Swal);
const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

const delete_friend = room => {
  MySwal.fire({
    html: `<span> Friend removed from Friends List </span>`,
    type: "success",
    confirmButtonColor: "green"
  });
};

// deleteFriend(data_room) {
//   Links.update({
//     friend: data_friend[0],
//   });
// }

const AcceptFriend = create =>
  Swal.mixin({
    input: "text",
    confirmButtonText: "Next &rarr;",
    showCancelButton: true
  })
    .queue([])
    .then(result => {
      if (result.value) {
        Swal.fire({
          html: `Friend List has been updated`,
          type: "success",
          confirmButtonColor: "green"
        });
        create(result.value);
      }
    });

const RejectFriend = create =>
  Swal.mixin({
    input: "text",
    confirmButtonText: "Next &rarr;",
    showCancelButton: true
  })
    .queue([])
    .then(result => {
      if (result.value) {
        Swal.fire({
          html: `Friend Request has been removed`,
          type: "success",
          confirmButtonColor: "green"
        });
        create(result.value);
      }
    });

export default function MediaCard(props) {
  const classes = useStyles();
  const { name, image, fav, creator, f_creator } = props;
  const send_friend_request = creator === "Request";
  const accept_friend_request = creator === "Accept";
  // const links = Links.find({
  //   email: user.emails && user.emails[0].address
  // }).fetch();
  // let favoriteCount = links[0].favorites.length;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}

            {/* Meteor Username */}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* has {fav} favourite songs */}
            {/* favorited {favoriteCount.length > 2 ? "songs" : "song"} */}
            favorited {fav <= 0 ? "no" : fav} {fav >= 1 ? " songs " : "song"}
            {/* Number of Favorite SOngs */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* Show Current TAB BUTTONS */}
        {!send_friend_request && !accept_friend_request && (
          <div>
            <Button
              size="small"
              color="primary"
              onClick={() => delete_friend()}
            >
              Delete Friend
            </Button>
            <Button size="small" color="primary">
              Friends
              <Check />
            </Button>
          </div>
        )}
        {/* Show Create TAB BUTTONS */}
        {send_friend_request && (
          <Button size="small" color="primary" onClick={() => f_creator()}>
            Send Friend Request
          </Button>
        )}
        {/* Show JOIN TAB BUTTONS */}
        {accept_friend_request && (
          <div>
            <Button size="small" color="primary" onClick={() => AcceptFriend()}>
              Accept Friend Request
            </Button>
            <Button size="small" color="primary" onClick={() => RejectFriend()}>
              Reject Friend Request
            </Button>
          </div>
        )}
      </CardActions>
    </Card>
  );
}
