import app from "./app";
import  http from "http"
import { setupSocket } from "./socket";

const server=http.createServer(app);
setupSocket(server)

app.listen(4002,()=>{
  console.log(`server is running at ${4002}`)
})