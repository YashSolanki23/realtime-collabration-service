import express from "express"
import Presenceroutes from "./routes/presence.routes"

const app=express()

app.use(express.json())
app.use("/presence",Presenceroutes)
app.get("/health",(_req,res)=>{
  res.json({
    status:"ok"
  })
})


export default app;