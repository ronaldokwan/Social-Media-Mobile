import { ObjectId } from "mongodb";
import database from "../config/mongodb.js";
import { hashPassword } from "../helpers/bcrypt.js";
class User {
  static userCollection() {
    return database.collection("user");
  }

  static async findName(name) {
    const user = await this.userCollection().findOne({
      name,
    });
    return user;
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

  static async getDetail(id) {
    const aggregate = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "followings",
        },
      },
      {
        $lookup: {
          from: "users",
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
    const cursor = await this.userCollection.aggregate(aggregate);
    const result = await cursor.toArray();
    return result[0];
  }
}

export default User;
