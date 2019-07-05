import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Links = new Mongo.Collection("links");
export const Rooms = new Mongo.Collection("rooms");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("rooms", function roomsKbox() {
    return Rooms.find();
  });
}

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("links", function linksKbox() {
    return Links.find();
  });
}
Meteor.methods({
  "links.insert"(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Links.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    });
  },
  "links.remove"(taskId) {
    check(taskId, String);

    Links.remove(taskId);
  },
  "links.setChecked"(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Links.update(taskId, { $set: { checked: setChecked } });
  }
});
