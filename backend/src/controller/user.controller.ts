import { FastifyReply, FastifyRequest } from "fastify";

import { createUserBodySchema, findByIdUserParamsSchema } from "../@types";

import { UserService } from "../service/user.service";

export class UserController {
  static async create(request: FastifyRequest, response: FastifyReply) {
    const { name, githubUrl, linkedinUrl } = createUserBodySchema.parse(
      request.body
    );

    await UserService.create({ name, linkedinUrl, githubUrl });

    return response.status(204).send();
  }

  static async findById(request: FastifyRequest, response: FastifyReply) {
    const { userId } = findByIdUserParamsSchema.parse(request.params);

    const userFound = await UserService.findById(userId);

    return response.status(200).send({ user: userFound });
  }
}
