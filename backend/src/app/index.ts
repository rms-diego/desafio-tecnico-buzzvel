import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";

// middlewares
import { errorMiddleware } from "../utils/error-middleware";

//routes
import { userRoutes } from "../routes/user.routes";

const app = fastify({ logger: true });

app.setErrorHandler(errorMiddleware);

app.register(cors);
app.register(userRoutes, {
  prefix: "user",
});

export { app };
