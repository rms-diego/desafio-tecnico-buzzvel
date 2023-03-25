import "dotenv/config";
import fastify from "fastify";

//routes
import { userRoutes } from "../routes/user.routes";

const app = fastify();

app.register(userRoutes, {
  prefix: "user",
});

export { app };
