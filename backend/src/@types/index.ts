import { z as zod } from "zod";

// create User Types
export const createUserBodySchema = zod.object({
  name: zod.string().min(3),
  linkedinUrl: zod.string(),
  githubUrl: zod.string(),
});

export type createUserDTO = zod.infer<typeof createUserBodySchema>;

// find by id user types
export const findByIdUserParamsSchema = zod.object({
  userId: zod.string().uuid(),
});
