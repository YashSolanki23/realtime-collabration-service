const onlineUsers=new Map<string,string>();

export function userOnline(userId:string,socketId:string){
  onlineUsers.set(userId,socketId);
}

export function userOffline(userId:string){
  onlineUsers.delete(userId);
}

export function getOnlineUsers(){
  return Array.from(onlineUsers.keys());
}

export function isUserOnline(userId:string){
  return onlineUsers.has(userId)
}