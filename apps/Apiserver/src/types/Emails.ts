// types/Emails.ts
import { z } from "zod";

export const ReceivedEmailSchema = z.object({
  from: z.string().email(),
  subject: z.string(),
  body: z.string(),
  date: z.string()
});

export type ReceivedEmailType = z.infer<typeof ReceivedEmailSchema>;