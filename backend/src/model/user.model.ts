import { createUserDTO } from "../@types";
import { prisma } from "../utils/database-client";

export class UserModel {
  static async create({ name, githubUrl, linkedinUrl }: createUserDTO) {
    const userCreated = await prisma.user.create({
      data: { name, githubLink: githubUrl, linkedinLink: linkedinUrl },
    });

    return userCreated;
  }

  static async findByGithubUrl(githubLink: string) {
    const userFound = await prisma.user.findFirst({ where: { githubLink } });

    return userFound;
  }
}
