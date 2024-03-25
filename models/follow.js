import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";

class Follow {
  static followCollection() {
    return database.collection("follows");
  }

  static async find() {
    const follows = await this.followCollection.find().toArray();
    return follows;
  }

  static async findById(id) {
    const follow = await this.followCollection.findOne({
      _id: new ObjectId(String(id)),
    });
    return follow;
  }

  static async create(data) {
    const newFollow = await this.followCollection.insertOne(data);
    return newFollow;
  }
}

export default Follow;
