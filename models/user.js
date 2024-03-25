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
}

export default User;
