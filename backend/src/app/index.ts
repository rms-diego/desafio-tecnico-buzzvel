import "dotenv/config";
import fastify from "fastify";

// middlewares
import { errorMiddleware } from "../utils/error-middleware";

//routes
import { userRoutes } from "../routes/user.routes";

const app = fastify();

app.setErrorHandler(errorMiddleware);

app.register(userRoutes, {
  prefix: "user",
});

export { app };
