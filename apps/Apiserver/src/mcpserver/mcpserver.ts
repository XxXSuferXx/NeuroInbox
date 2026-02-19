import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import z from "zod";
import { ReceivedEmailSchema, type ReceivedEmailType } from "../types/Emails.js";
dotenv.config();
const API_KEY= process.env.GOOGLE_GEMINI_API;
const ai = new GoogleGenAI({apiKey:API_KEY});
const createMcpserver = () => {
    const server = new McpServer({
        name: "Email MCP server",
        version: "1.0.0"
    });

    //just for Checking the User 
    server.registerPrompt(
        "Greeting",
        {
            title:"Greet user",
             description: "Greet user in the language is typed and Tell that NeuroInbox is ready to read, write, send emails",
        },
        async ()=>{
            const greetResponse = await ai.models.generateContent({
                model:"gemini-flash-latest",
                contents:`Greet user in NeuroInbox Application in just 1 line is ready to read, write, and send emails.`
            });
            
            return {
            messages:[
                {
                    role:"assistant",
                    content:{
                        type:"text",
                        text:greetResponse.text ??"",
                    }
                }
            ]
        } }
    );

    // Email Box Reading lists 

    // server.registerTool(
    //     "Read Mails",
    //     {
    //         title:"Read mails from user Inbox",
    //         description:"This tool will read the mail from the user Inbox and sends the list to the user only top latest 10 mails",
    //         inputSchema:{
    //             prompt:z.string(),
    //         },
    //         outputSchema:z.object({
    //             emailList:z.array(ReceivedEmailSchema),
    //         })
    //     },
    //     async ({prompt})=>{
    //         const sessionSecret;

    //         return();
    //     }
    // )




    //Email Box Reading and Then Responding to the User 





    //Drafting the message in emails box 





    // Drafting and Sending the mails from mailbox.










    return server;
}

export default createMcpserver;