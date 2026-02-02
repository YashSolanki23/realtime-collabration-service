import http from "http"
import app from "./app"
import { initSocket } from "./socket"

const port=process.env.port || 4000

const server=http.createServer(app)

initSocket(server)

server.listen(port,()=>{
  console.log(`real-time service is running on port ${port}`)
})