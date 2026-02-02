import {Router} from "express"
import { getOnlineUser } from "../presence.redis"

const Presenceroutes=Router()

Presenceroutes.get("/Online-Users",async (_req,res)=>{
  const users=await getOnlineUser();
  res.json(users);
})

export default Presenceroutes;