import database from "../config/mongodb.js";
import { ObjectId } from "mongodb";
class Posts {
  static postsCollection() {
    return database.collection("posts");
  }

  static async create({ content, tags, imgUrl, authorId }) {
    const createdAt = new Date();
    const updatedAt = new Date();
    const newPosts = await this.postsCollection().insertOne({
      content,
      tags,
      imgUrl,
      authorId,
      createdAt,
      updatedAt,
      comments: [],
      likes: [],
    });
    const posts = await this.postsCollection().findOne({
      _id: newPosts.insertedId,
    });
    return posts;
  }
  static async findByDate() {
    const posts = await this.postsCollection()
      .find()
      .sort({ updatedAt: -1 })
      .toArray();
    return posts;
  }
  static async findById(_id) {
    _id = new ObjectId(String(_id));
    const post = await this.postsCollection().findOne({
      _id,
    });
    return post;
  }
  static async createComments({ _id, content, username }) {
    const post = await this.findById(_id);
    if (!post) {
      throw new Error("Post not found");
    }
    const comment = {
      content,
      username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    post.comments.push(comment);
    _id = new ObjectId(String(_id));
    await this.postsCollection().updateOne({ _id }, { $set: post });
    return post;
  }
}

export default Posts;
