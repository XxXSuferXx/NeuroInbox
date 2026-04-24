import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import Auth from "./passportAuth/passport.js";
import passport from "passport";
import cors from "cors";
import createMcpserver from "./mcpserver/mcpserver.js";
import {StreamableHTTPServerTransport} from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { randomUUID } from "crypto";
dotenv.config();
const app = express();
//MCP server setup

const mcpserver = createMcpserver();

const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator:()=>randomUUID(),
  enableJsonResponse:true,
}
);
await mcpserver.connect(transport);
app.use(cors({
  origin:process.env['FRONTEND_URL'],
  credentials:true
}));

app.use(session({
  secret: process.env['Session_secret'] || "",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "lax"
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/email/google",Auth);
app.use("/mcp",async (req,res)=>{
  await transport.handleRequest(req,res);
});
app.use(express.json());
app.get("/",(req, res)=>{
    return res.status(200).send("Server Running");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}); 