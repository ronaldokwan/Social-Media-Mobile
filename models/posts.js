import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";

class Posts {
  static postsCollection() {
    return database.collection("posts");
  }

  static async find() {
    const posts = await this.postsCollection.find().toArray();
    return posts;
  }

  static async findById(id) {
    const posts = await this.postsCollection.findOne({
      _id: new ObjectId(String(id)),
    });
    return posts;
  }

  static async create(data) {
    const newPosts = await this.postsCollection.insertOne(data);
    return newPosts;
  }
}

export default Posts;
