import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const redis = new Redis({
  host: "redis-12659.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 12659,
  username: "default",
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

export default redis;
