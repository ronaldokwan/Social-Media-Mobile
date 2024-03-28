import database from "../config/mongodb.js";
import { ObjectId } from "mongodb";

class Posts {
  static postsCollection() {
    return database.collection("posts");
  }

  static async create({ content, tags, imgUrl, authorId }) {
    const createdAt = new Date();
    const updatedAt = new Date();
    authorId = new ObjectId(String(authorId));
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
    const aggregate = [
      {
        $lookup: {
          from: "user",
          localField: "authorId",
          foreignField: "_id",
          as: "authorDetail",
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
    ];

    const posts = await this.postsCollection().aggregate(aggregate).toArray();
    return posts;
  }
  static async findById(_id) {
    _id = new ObjectId(String(_id));
    const aggregate = [
      {
        $match: { _id },
      },
      {
        $lookup: {
          from: "user",
          localField: "authorId",
          foreignField: "_id",
          as: "authorDetail",
        },
      },
    ];

    const post = await this.postsCollection().aggregate(aggregate).toArray();
    return post[0];
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
  static async createLikes({ _id, username }) {
    const post = await this.findById(_id);
    if (!post) {
      throw new Error("Post not found");
    }
    const like = {
      username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    post.likes.push(like);
    _id = new ObjectId(String(_id));
    await this.postsCollection().updateOne({ _id }, { $set: post });
    return post;
  }
}

export default Posts;
