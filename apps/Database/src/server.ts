import express from "express";
import dotenv from "dotenv";
import user from "./user/index.js";
dotenv.config();
const DatabaseServer = express();

DatabaseServer.use(express.json());
DatabaseServer.use("/users",user);

DatabaseServer.listen(process.env.DATABASE_PORT,()=>{
    console.log("Database Running on Port "+ process.env.DATABASE_PORT);
});