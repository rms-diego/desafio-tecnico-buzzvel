import { createUserDTO } from "../@types";
import { UserModel } from "../model/user.model";
import { Exception } from "../utils/Exception";

export class UserService {
  static async create({ name, linkedinUrl, githubUrl }: createUserDTO) {
    const userAlreadyExists = await UserModel.findByGithubUrl(githubUrl);

    if (userAlreadyExists) throw new Exception("User Already Exists", 409);

    const userCreated = await UserModel.create({
      name,
      linkedinUrl,
      githubUrl,
    });

    return userCreated;
  }

  static async findByName(name: string) {
    const userFound = await UserModel.findByName(name);

    if (!userFound) throw new Exception("User does not exists", 404);

    return userFound;
  }
}
