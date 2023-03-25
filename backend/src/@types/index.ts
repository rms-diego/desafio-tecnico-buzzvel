import { z as zod } from "zod";

export const createUserBodySchema = zod.object({
  name: zod.string().min(3),
  linkedinUrl: zod.string(),
  githubUrl: zod.string(),
});

export type createUserDTO = zod.infer<typeof createUserBodySchema>;
