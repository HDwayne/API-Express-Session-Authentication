import mongoose from "mongoose";
import Redis from "ioredis";
import { REDIS_OPTIONS, APP_PORT, MONGO_URI, MONGO_OPTIONS } from "./config";
import RedisStore from "connect-redis";
import { createApp } from "./app";

(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

  const client = new Redis(REDIS_OPTIONS);

  client.on("connect", () => {
    console.log("Redis is connected");
  });
  client.on("error", (err) => {
    console.log("Redis error: ", err);
  });
  const store = new RedisStore({
    client: client,
  });
  const app = createApp(store);

  app.listen(APP_PORT, () => {
    console.log(`http://localhost:${APP_PORT}`);
  });
})();
