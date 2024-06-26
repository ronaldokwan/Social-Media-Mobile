import { ObjectId } from "mongodb";
import database from "../config/mongodb.js";
import { hashPassword } from "../helpers/bcrypt.js";
class User {
  static userCollection() {
    return database.collection("user");
  }
  static async findUsername(username) {
    const user = await this.userCollection().findOne({
      username,
    });
    return user;
  }
  static async findEmail(email) {
    const user = await this.userCollection().findOne({
      email,
    });
    return user;
  }
  static async create(data) {
    let { name, username, email, password } = data;
    password = hashPassword(password);
    const newUser = await this.userCollection().insertOne({
      name,
      username,
      email,
      password,
    });
    const user = await this.userCollection().findOne({
      _id: newUser.insertedId,
    });
    return user;
  }
  static async findId(_id) {
    _id = new ObjectId(String(_id));
    const aggregate = [
      {
        $match: {
          _id: new ObjectId(String(_id)),
        },
      },
      {
        $lookup: {
          from: "follow",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "followers.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "follow",
          localField: "_id",
          foreignField: "followerId",
          as: "followings",
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "followings.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $project: {
          password: 0,
          followingDetail: {
            password: 0,
          },
          followerDetail: {
            password: 0,
          },
        },
      },
    ];
    const cursor = this.userCollection().aggregate(aggregate);
    const result = await cursor.toArray();
    return result[0];
  }
  static async getDetail(username) {
    const user = await this.userCollection().findOne({
      username,
    });
    const { _id } = user;
    const aggregate = [
      {
        $match: {
          _id: new ObjectId(String(_id)),
        },
      },
      {
        $lookup: {
          from: "follow",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "followers.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "follow",
          localField: "_id",
          foreignField: "followerId",
          as: "followings",
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "followings.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $project: {
          password: 0,
          followingDetail: {
            password: 0,
          },
          followerDetail: {
            password: 0,
          },
        },
      },
    ];
    const cursor = this.userCollection().aggregate(aggregate);
    const result = await cursor.toArray();
    return result[0];
  }
}

export default User;
