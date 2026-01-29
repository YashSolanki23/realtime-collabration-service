const onlineUsers=new Set<string>();

export function addUser(userId:string){
  onlineUsers.add(userId)
}

export function removeUser(userId:string){
  onlineUsers.delete(userId)
}

export function getOnlineUsers(){
  return Array.from(onlineUsers.keys());
}

export function isUserOnline(userId:string){
  return onlineUsers.has(userId)
}