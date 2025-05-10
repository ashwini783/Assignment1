import cors from "cors"
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRouter";
import {connectDB} from './config/userConfig'
import config from "./config";
connectDB();
const PORT=config.port
const app=express();
const host=config.host
 app.use(express.json());
 app.use(cors());
 app.get("/", (req: Request, res: Response) => {
   res.send({ message: "Hello API" });
 });
  app.use('/api/v1/user',userRoutes)
  app.use(cors());
 app.listen(PORT,host,()=>{
    console.log(`[ ready ] http://${host}:${PORT}`)
 })

 export default app