import React, { Component } from "react";
import { withTracker } from 'meteor/react-meteor-data';

// Task component - represents a single todo item
export default class Favorites extends Component {
  constructor(props) {
    super(props);
  }
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Favorites.update(this.props.favorite._id, {
      $set: { favorite: !this.props.favorite.favorite }
    });
  }

  deleteThisTask() {
    Favourites.remove(this.props.favorite._id);
  }

  render() {
    // const { classes } = this.props;

    const taskClassName = this.props.task.checked ? "checked" : "";

    return (
      <li className={}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>

        {/* <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        /> */}

        <span className="text">{this.props.task.text}</span>
      </li>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("favourites"); // NEW!
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    favourites: Favourite.find({}).fetch()
  };
}, App);