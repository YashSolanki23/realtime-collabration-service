import Server from "socketio"
import {Server as Httpserver} from "http"
import { addUser,getOnlineUser,removeUser } from "./presence.redis";
import { Publisher, Subscriber } from "../pubsub";



export function initSocket(server:Httpserver){
  const io=new Server(server,{
    cors:{
      origin:"*"
    }
  });

  Subscriber.subscribe("presence-events");

  Subscriber.on("message",(_channel,message)=>{
    const event=JSON.parse(message);

    io.emit("presenct:update",{
      userID:event.userId,
      status:event.type,
      onlineUser:event.onlineUser
    })
  })


  io.on("connection",(socket)=>{
    console.log("socket connected",socket.id)

    socket.on("user-online",async (userId:string)=>{
    socket.data.userId=userId

    await addUser(userId)

    const users=await getOnlineUser();

    await Publisher.publish("presence-events",JSON.stringify({
      type:"online",
      userId,
      onlineUsers:users
    }))
    })

   
    socket.on("disconnect",async ()=>{
      const userId=socket.data.userId

      if(!userId) return;

      await removeUser(userId)

      const users=getOnlineUser()

      await Publisher.publish("presence-event",JSON.stringify({
        type:"offline",
        userId,
        onlineUsers:users
      }))

      console.log("Socket Disconnected",socket.id);
    })
  })


}