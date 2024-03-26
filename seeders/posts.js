import database from "../config/mongodb.js";
import data from "../data/posts.json" assert { type: "json" };

async function seeding() {
  const postsDB = database.collection("posts");
  const posts = data;
  const newPosts = posts.map((post) => {
    post.createdAt = new Date();
    post.updatedAt = new Date();
    return post;
  });
  await postsDB.insertMany(newPosts);
}
seeding();
