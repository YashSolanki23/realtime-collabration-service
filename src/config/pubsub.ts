import Redis from "ioredis";

export const Publisher=new Redis();
export const Subscriber=new Redis();