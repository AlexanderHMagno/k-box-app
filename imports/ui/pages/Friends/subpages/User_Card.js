import React from "react";
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
import PropTypes from "prop-types";
import { Links } from "../../../../api/links";
import { Meteor } from "meteor/meteor";
import { withStyles } from "@material-ui/core/styles";
// import { withTracker } from "meteor/react-meteor-data";

const MySwal = withReactContent(Swal);

const FavoriteCount = ({ fav }) => {
  if (!fav) {
    return "no favorite songs";
  }
  if (fav === 1) {
    return `${fav} favorite song`;
  }
  return `${fav} favorite songs`;
};

FavoriteCount.propTypes = {
  fav: PropTypes.number
};

const useStyles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

class User_Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      friends: Links.find({ _id: Meteor.userId() }).fetch(),
      links: Links.find({}).fetch()
    };
  }

  sendInvite(_id, username) {
    let owner = Meteor.userId();

    Links.update(
      { _id: owner },
      {
        $push: {
          friends: {
            _id: _id,
            username: username,
            status: "invitefriend"
          }
        }
      }
    );
    Links.update(
      { _id: _id },
      {
        $push: {
          friends: {
            _id: owner,
            username: Meteor.user().username,
            status: "friendrequest"
          }
        }
      }
    );

    MySwal.fire({
      html: `<span>  Invitation sent to ${username}  </span>`,
      type: "success",
      confirmButtonColor: "Green"
    });
    if (this.props.onFriendChange) {
      this.props.onFriendChange();
    }
  }

  AcceptFriend(_id, username) {
    let owner = Meteor.userId();

    const ownerObject = Links.findOne({ _id: owner });
    const friendObject = Links.findOne({ _id: _id });

    ownerObject.friends = ownerObject.friends.map(friend => {
      if (friend._id == _id) {
        return {
          _id: _id,
          username: username,
          status: "friends"
        };
      }
      return friend;
    });
    Links.update(
      { _id: owner },
      {
        $set: {
          friends: ownerObject.friends
        }
      }
    );

    friendObject.friends = friendObject.friends.map(friend => {
      if (friend._id == owner) {
        return {
          _id: owner,
          username: Meteor.user().username,
          status: "friends"
        };
      }
      return friend;
    });
    Links.update(
      { _id: friendObject._id },
      {
        $set: {
          friends: friendObject.friends
        }
      }
    );

    MySwal.fire({
      html: `<span>  ${username} is now on your friend list </span>`,
      type: "success",
      confirmButtonColor: "Green"
    });
    if (this.props.onFriendChange) {
      this.props.onFriendChange();
    }
  }

  RejectFriend(_id, username) {
    let owner = Meteor.userId();
    const ownerObject = Links.findOne({ _id: owner });
    const friendObject = Links.findOne({ _id: _id });

    ownerObject.friends = ownerObject.friends.filter(friend => {
      if (friend._id === _id) {
        return false;
      }
      return true;
    });
    Links.update(
      { _id: owner },
      {
        $set: {
          friends: ownerObject.friends
        }
      }
    );

    friendObject.friends = friendObject.friends.filter(friend => {
      if (friend._id == owner) {
        return false;
      }
      return true;
    });
    Links.update(
      { _id: friendObject._id },
      {
        $set: {
          friends: friendObject.friends
        }
      }
    );

    MySwal.fire({
      html: ` Friend Request from  ${username} has been removed`,
      type: "success",
      confirmButtonColor: "green"
    });
    if (this.props.onFriendChange) {
      this.props.onFriendChange();
    }
  }

  DeleteInvite(_id, username) {
    let owner = Meteor.userId();
    const ownerObject = Links.findOne({ _id: owner });
    const friendObject = Links.findOne({ _id: _id });

    ownerObject.friends = ownerObject.friends.filter(friend => {
      if (friend._id === _id) {
        return false;
      }
      return true;
    });
    Links.update(
      { _id: owner },
      {
        $set: {
          friends: ownerObject.friends
        }
      }
    );

    friendObject.friends = friendObject.friends.filter(friend => {
      if (friend._id == owner) {
        return false;
      }
      return true;
    });
    Links.update(
      { _id: friendObject._id },
      {
        $set: {
          friends: friendObject.friends
        }
      }
    );

    MySwal.fire({
      html: ` Friend Invite to ${username} has been deleted`,
      type: "success",
      confirmButtonColor: "green"
    });
    if (this.props.onFriendChange) {
      this.props.onFriendChange();
    }
  }

  DeleteFriend(_id, username) {
    let owner = Meteor.userId();
    const ownerObject = Links.findOne({ _id: owner });
    const friendObject = Links.findOne({ _id: _id });

    ownerObject.friends = ownerObject.friends.filter(friend => {
      if (friend._id === _id) {
        return false;
      }
      return true;
    });
    Links.update(
      { _id: owner },
      {
        $set: {
          friends: ownerObject.friends
        }
      }
    );

    friendObject.friends = friendObject.friends.filter(friend => {
      if (friend._id == owner) {
        return false;
      }
      return true;
    });
    Links.update(
      { _id: friendObject._id },
      {
        $set: {
          friends: friendObject.friends
        }
      }
    );

    MySwal.fire({
      html: `${username} has been removed from Friend List`,
      type: "success",
      confirmButtonColor: "green"
    });
    if (this.props.onFriendChange) {
      this.props.onFriendChange();
    }
  }

  render() {
    const { name, classes, image, fav, friendStatus, id_user } = this.props;

    let actions = null;
    if (id_user === Meteor.userId()) {
      actions = <h3>Personal Card</h3>;
    } else if (!friendStatus) {
      actions = (
        <Button
          size="small"
          color="primary"
          onClick={() => this.sendInvite(id_user, name)}
        >
          Send Friend Request
        </Button>
      );
    } else if (friendStatus == "friendrequest") {
      actions = (
        <div>
          <Button
            size="small"
            color="primary"
            onClick={() => this.AcceptFriend(id_user, name)}
          >
            Accept Friend Request
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => this.RejectFriend(id_user, name)}
          >
            Reject Friend Request
          </Button>
        </div>
      );
    } else if (friendStatus == "invitefriend") {
      actions = (
        <Button
          size="small"
          color="primary"
          onClick={() => this.DeleteInvite(id_user, name)}
        >
          Delete Friend Request
        </Button>
      );
    } else if (friendStatus == "friends") {
      actions = (
        <>
          <div>
            <Button
              size="small"
              color="primary"
              onClick={() => this.DeleteFriend(id_user, name)}
            >
              Delete Friend
            </Button>
            <Button size="small" color="primary">
              Friends
              <Check />
            </Button>
          </div>
        </>
      );
    }

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} title={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <FavoriteCount fav={fav} />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>{actions}</CardActions>
      </Card>
    );
  }
}

User_Card.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  image: PropTypes.string,
  fav: PropTypes.number,
  friendStatus: PropTypes.string,
  id_user: PropTypes.string
};
export default withStyles(useStyles)(User_Card);

// export default withTracker(() => {
//   Meteor.subscribe("links");
//   return {
//     user: Meteor.user()
//userId: Meteor.userId()
//   };
// })(withStyles(useStyles)(User_Card);
