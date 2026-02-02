import { redis } from "./redis";

const ONLINE_USER_KEY="online_users";

export async function addUser(userId:string){
  await redis.sadd(ONLINE_USER_KEY,userId)
}

export async function removeUser(userId:string){
  await redis.srem(ONLINE_USER_KEY,userId)
}

export async function getOnlineUser(){
  return await redis.smembers(ONLINE_USER_KEY)
}

export async function isUserOnline(userId:string)
{
  return await redis.sismember(ONLINE_USER_KEY,userId)
}