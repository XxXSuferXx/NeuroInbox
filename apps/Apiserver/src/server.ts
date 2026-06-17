import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import Auth from "./passportAuth/passport.js";
import passport, { authorize } from "passport";
import cors from "cors";
import createMcpserver from "./mcpserver/mcpserver.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { randomUUID } from "crypto";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env['FRONTEND_URL'],
  credentials: true
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
app.use("/email/google", Auth);

const sessions: Record<string, { transport: StreamableHTTPServerTransport; mcpserver: ReturnType<typeof createMcpserver> }> = {};

app.use("/mcp", async (req, res) => {
  // Extract session ID from headers or query params
  const sessionId = (req.headers["mcp-session-id"] as string) || (req.query.sessionId as string);
  const{ tools, input} = req.body;
  // 1. If we have an existing session, route to its transport
  if (sessionId && sessions[sessionId]) {
    try {
      await sessions[sessionId].transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error(error);
      return res.status(500).send("MCP Down");
    }
    return;
  }

  // 2. Otherwise, create a new session (e.g., initial connection)
  const newSessionId = randomUUID();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => newSessionId,
    enableJsonResponse: true,
  });

  const mcpserver = createMcpserver();
  // Cleanup when the connection closes
  transport.onclose = () => {
    mcpserver.close();
    delete sessions[newSessionId];
  };

  sessions[newSessionId] = { transport, mcpserver };

  mcpserver.connect(transport).catch(console.error);

  try {
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error(error);
    return res.status(500).send("MCP Down");
  }
});


app.get("/", (req, res) => {
  return res.status(200).send("Server Running");
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}); 