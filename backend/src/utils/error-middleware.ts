import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import { Exception } from "./Exception";
import { z as zod } from "zod";

export const errorMiddleware = async (
  error: FastifyError,
  _request: FastifyRequest,
  response: FastifyReply
) => {
  if (error instanceof Exception) {
    return response.status(error.statusCode).send({ error: error.message });
  }

  if (error instanceof zod.ZodError) {
    const convertError = JSON.parse(error.message)[0];

    const messageError = convertError.message;
    const errorField = convertError.path[0];

    return response.status(400).send({
      error: {
        field: errorField,
        message: messageError,
      },
    });
  }

  return response.status(500).send({ error: error.message });
};
