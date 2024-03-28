import { ObjectId } from "mongodb";
import database from "../config/mongodb.js";

class Follow {
  static followCollection() {
    return database.collection("follow");
  }

  static async create({ followingId, followerId }) {
    const createdAt = new Date();
    const updatedAt = new Date();
    followingId = new ObjectId(String(followingId));
    followerId = new ObjectId(String(followerId));
    const newFollow = await this.followCollection().insertOne({
      followingId,
      followerId,
      createdAt,
      updatedAt,
    });
    const follow = await this.followCollection().findOne({
      _id: newFollow.insertedId,
    });
    return follow;
  }
}

export default Follow;
