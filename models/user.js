import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";

class User {
  static userCollection() {
    return database.collection("users");
  }

  static async find() {
    const users = await this.userCollection.find().toArray();
    return users;
  }

  static async findById(id) {
    const user = await this.userCollection.findOne({
      _id: new ObjectId(String(id)),
    });
    return user;
  }

  static async create(data) {
    const newUser = await this.userCollection.insertOne(data);
    return newUser;
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
