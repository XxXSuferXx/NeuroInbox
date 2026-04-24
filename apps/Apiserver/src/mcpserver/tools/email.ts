import { google } from "googleapis";
import { oauth2Client } from "../../passportAuth/passport.js";

const gmail = google.gmail({ version: "v1", auth: oauth2Client });

const readMails = async () => {
  try {
    const response = await gmail.users.messages.list({
      userId: "me",
    });

    const messages = (response.data.messages || []).filter(
      (msg) => msg.id
    );

    const emailData = await Promise.all(
      messages.map(async (msg) => {
        const mail = await gmail.users.messages.get({
          userId: "me",
          id: msg.id!,
          format: "full", //needed for body
        });

        const headers = mail.data.payload?.headers || [];

        const getHeader = (name:string) =>
          headers.find((h) => h.name === name)?.value;

        // extract body
        const getBody = (payload:any) => {
          if (!payload) return "";

          // if simple body
          if (payload.body?.data) {
            return Buffer.from(payload.body.data, "base64").toString("utf-8");
          }

          // if multipart (most emails)
          if (payload.parts) {
            for (const part of payload.parts) {
              if (part.mimeType === "text/plain" && part.body?.data) {
                return Buffer.from(part.body.data, "base64").toString("utf-8");
              }
            }
          }

          return "";
        };

        return {
          id: msg.id,
          threadId: msg.threadId,
          snippet: mail.data.snippet,
          from: getHeader("From"),
          subject: getHeader("Subject"),
          date: getHeader("Date"),
          body: getBody(mail.data.payload),
        };
      })
    );

    return emailData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createDraft = async (ReceiverMailIds:string[],Subject:string,Message:string)=>{
  if (!ReceiverMailIds.length) {
      throw new Error("At least one receiver email is required");
    }
    try {
      const email = [
      `To: ${ReceiverMailIds.join(",")}`,
      `Subject: ${Subject}`,
      "Content-Type: text/plain; charset=utf-8",
      "",
      Message,
    ].join("\n");

     // encode base64 (URL-safe)
    const encodedMessage = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
      const Draft = await gmail.users.drafts.create({
        userId:"me",
        requestBody:{
          message:{
            raw:encodedMessage
          }
        }
      });
      return Draft.data;
    } catch (error) {
        console.error("createDraft error:", error);
        throw error;
    }
}

const sendMail = async (DraftId:string)=>{
  if(DraftId){
   try {
    const response = await gmail.users.drafts.send({
      userId: "me",
      requestBody: {
        id: DraftId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("sendDraft error:", error);
    throw error;
  }
  }
}

export {readMails,createDraft,sendMail};