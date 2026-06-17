import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import z from "zod";
import { readMails, createDraft, sendMail } from "./tools/email.js";
dotenv.config();
const API_KEY = process.env.GOOGLE_GEMINI_API;
const ai = new GoogleGenAI({ apiKey: API_KEY });
const createMcpserver = () => {
    const server = new McpServer({
        name: "Email MCP server",
        version: "1.0.0"
    });

    //just for Checking the User 
    server.registerPrompt(
        "greeting",
        {
            title: "Greet user",
            description: "Greet user in the language is typed and Tell that NeuroInbox is ready to read, write, send emails",
        },
        async () => {
            const greetResponse = await ai.models.generateContent({
                model: "gemini-flash-latest",
                contents: `Greet user in NeuroInbox Application in just 1 line is ready to read, write, and send emails.`
            });

            return {
                messages: [
                    {
                        role: "assistant",
                        content: {
                            type: "text",
                            text: greetResponse.text ?? "",
                        }
                    }
                ]
            }
        }
    );

    // Email Box Reading lists 

    server.registerTool(
        "read_mails",
        {
            title: "Read mails from user Inbox",
            description: "This tool will read the mail from the user Inbox and sends the list to the user only top latest  mails",
            inputSchema: {
                prompt: z.string(),
            },
        },
        async ({ prompt }) => {
            try {
                const emails = await readMails(); // fetch all mails first

                const aiResponse = await ai.models.generateContent({
                    model: "gemini-flash-latest",
                    contents: `You are an email assistant.User request:"${prompt}"Here are emails:
                    ${emails.map(e => ({ from: e.from, subject: e.subject, body: e.body, date: e.date }))}
                    Return ONLY a JSON array of filtered emails based on user request.
                    By default fetch first 5 mails.
                    Each email should contain: from,date,subject,body.
                    Remove links,photos,videos from body. 
                    Only it should contain textformat
                    Do not return anything else.
                        `,
                });

                const text = aiResponse.text ?? "[]";

                let filtered = [];
                try {
                    filtered = JSON.parse(text);
                } catch {
                    filtered = [];
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: `Filtered ${filtered.length} emails`,
                        },
                    ],
                    structuredContent: {
                        emailList: filtered,
                    },
                };
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    );

    //Drafting the message in emails box 
    server.registerTool(
        "generate_draft",
        {
            title: "Create a Draft as User says",
            description: "Create a Email Draft based on User request",
            inputSchema: {
                prompt: z.string(),
            }
        },
        async ({ prompt }) => {
            let AIDraft;
            try {
                AIDraft = await ai.models.generateContent({
                    model: "gemini-flash-latest",
                    contents: `Generate Email for user  ${prompt} as he describes.
                    Mail should be structured.

                    Extract email addresses.

                    Return ONLY STRICT JSON (no text, no backticks):
                    {
                    "Message": "...",
                    "MailId": string | string[] | null,
                     "Subject": "..."
                    }`
                });
                // extract text properly
                const text = AIDraft.text;
                // clean markdown if present
                const cleanText = text?.replace(/```json|```/g, "").trim();




                let parsedData: {
                    Message: string;
                    MailId: string | string[] | null;
                    Subject: string;
                };

                try {
                    parsedData = JSON.parse(cleanText!);
                } catch (err) {
                    console.error("Invalid JSON from AI:", cleanText);
                    throw err;
                }

                //  create draft only if MailId exists
                let receiverMailIds: string[] = [];

                if (typeof parsedData.MailId === "string") {
                    receiverMailIds = [parsedData.MailId];
                } else if (Array.isArray(parsedData.MailId)) {
                    receiverMailIds = parsedData.MailId;
                }

                let Draft = null;
                if (receiverMailIds.length > 0) {
                    Draft = await createDraft(
                        receiverMailIds,
                        parsedData.Subject,
                        parsedData.Message);
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: `Draft created successfully`
                        }
                    ],
                    structuredContent: {
                        message: parsedData.Message,
                        mailId: parsedData.MailId,
                        draft: Draft
                    }
                };
            } catch (error) {
                console.error(error);
                throw error;
            }

        }
    );

    // Drafting and Sending the mails from mailbox.
    server.registerTool(
        "send_mails",
        {
            title: "Sending Mails",
            description: "First creating a Draft mail and then send mail to the reciever user entered",
            inputSchema: {
                prompt: z.string()
            }
        },
        async ({ prompt }) => {
            try {
                const AIDraft = await ai.models.generateContent({
                    model: "gemini-flash-latest",
                    contents: `Generate Email for user  ${prompt} as he describes.
                    Mail should be structured.

                    Extract email addresses.

                    Return ONLY STRICT JSON (no text, no backticks):
                    {
                    "Message": "...",
                    "MailId": string | string[] | null,
                     "Subject": "..."
                    }`
                });

                // extract text properly
                const text = AIDraft.text;
                // clean markdown if present
                const cleanText = text?.replace(/```json|```/g, "").trim();

                let parsedData: {
                    Message: string;
                    MailId: string | string[] | null;
                    Subject: string;
                };

                try {
                    parsedData = JSON.parse(cleanText!);
                } catch (err) {
                    console.error("Invalid JSON from AI:", cleanText);
                    throw err;
                }

                //  create draft only if MailId exists
                let receiverMailIds: string[] = [];

                if (typeof parsedData.MailId === "string") {
                    receiverMailIds = [parsedData.MailId];
                } else if (Array.isArray(parsedData.MailId)) {
                    receiverMailIds = parsedData.MailId;
                }

                let Draft = null;
                if (receiverMailIds.length > 0) {
                    Draft = await createDraft(
                        receiverMailIds,
                        parsedData.Subject,
                        parsedData.Message);
                }
                const sent = await sendMail(Draft?.id || "");
                return {
                    content: [
                        {
                            type: "text",
                            text: "Mail Send Successfully"
                        }
                    ]
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    );

    return server;
}

export default createMcpserver;