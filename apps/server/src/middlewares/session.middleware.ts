import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";
import { __cookie_ttl__, __prod__, __session_secret__ } from "../constants";

const redisClient = new Redis();
const RedisStore = connectRedis(session);
const redisStore = new RedisStore({ client: redisClient });

export const sessionMiddleware = session({
  name: "qid",
  resave: false,
  store: redisStore,
  saveUninitialized: false,
  secret: __session_secret__,
  cookie: {
    httpOnly: true,
    secure: __prod__,
    sameSite: "lax",
    maxAge: __cookie_ttl__,
  },
});
