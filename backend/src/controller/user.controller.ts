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
    let formateName = "";

    if (name.includes("-")) {
      const [firstName, lastName] = name.split("-");

      formateName = `${firstName} ${lastName}`;
    }

    const userFound = await UserService.findByName(
      formateName ? formateName : name
    );

    return response.status(200).send({ user: userFound });
  }
}
