import Redis from "ioredis";

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD
} = process.env;

const isRedisAvailable = !!REDIS_HOST && !!REDIS_PORT && !!REDIS_PASSWORD;

if (!isRedisAvailable) {
  console.log("Redis is not available");
}

export const redis = isRedisAvailable ? 
  new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    password: REDIS_PASSWORD,
    tls: { rejectUnauthorized: false }
  }) : null;
