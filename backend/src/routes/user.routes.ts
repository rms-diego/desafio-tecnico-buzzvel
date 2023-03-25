import { FastifyInstance } from "fastify";

// Controller
import { UserController } from "../controller/user.controller";

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/create", UserController.create);
};
