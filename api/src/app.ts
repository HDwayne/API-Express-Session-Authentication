import express from "express";
import session, { Store } from "express-session";
import { SESSION_OPTIONS } from "./config";
import { register, login, home } from "./routes";
import { serverError, notFound, active, catchAsync } from "./middleware";

export const createApp = (store: Store) => {
  const app = express();

  app.use(express.json());

  app.use(
    session({
      ...SESSION_OPTIONS,
      store: store,
    })
  );

  app.use(catchAsync(active))
  
  app.use(home);
  app.use(login);
  app.use(register);

  app.use(notFound);
  app.use(serverError);

  return app;
};
