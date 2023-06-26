import { RedisOptions } from 'ioredis'

const {
  REDIS_HOST = 'localhost',
  REDIS_PORT = 6379,
  REDIS_PASSWORD = 'secret'
} = process.env;

export const REDIS_OPTIONS: RedisOptions = {
  host: REDIS_HOST,
  port: +REDIS_PORT,
  password: REDIS_PASSWORD
};