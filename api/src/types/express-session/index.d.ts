import { SessionData } from "express-session"

declare module "express-session" {
    interface SessionData {
        userId: string;
        createdAt: number;
    }
}

export type MyContext = {
  req: Request & { session: session.SessionData };
  res: Response;
};