import { FastifyReply, FastifyRequest } from "fastify";

import { createUserBodySchema, findByUserNameParamsSchema } from "../@types";

import { UserService } from "../service/user.service";

export class UserController {
  static async create(request: FastifyRequest, response: FastifyReply) {
    const { name, githubUrl, linkedinUrl } = createUserBodySchema.parse(
      request.body
    );

    await UserService.create({ name, linkedinUrl, githubUrl });

    return response.status(204).send();
  }

  static async findByName(request: FastifyRequest, response: FastifyReply) {
    const { name } = findByUserNameParamsSchema.parse(request.params);

    const userFound = await UserService.findByName(name);

    return response.status(200).send({ user: userFound });
  }
}
