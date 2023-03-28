import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from "vitest";

import request from "supertest";

import { app } from "../src/app";
import { execSync } from "child_process";

describe("Tests cases for feature find user by name", () => {
  const server = app.server;

  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  beforeEach(async () => {
    // reinicia base de dados antes de cada test
    execSync("npx prisma migrate reset --force");

    const newUserBody = {
      name: "John Doe",
      linkedinUrl: "https://www.linkedin.com/in/john-doe",
      githubUrl: "https://github.com/john-doe",
    };

    await request(server).post("/user/create").send(newUserBody).expect(204);
  });

  test("[POST] [/user/findByName/:name] it should be able get a user", async () => {
    const {
      body: { user },
    } = await request(server).get("/user/findByName/John-Doe").expect(200);

    const { id, name, githubLink, linkedinLink } = user;

    expect(id).toBeDefined();
    expect(typeof id).toBe("string");

    expect(name).toBeDefined();
    expect(typeof name).toBe("string");

    expect(githubLink).toBeDefined();
    expect(typeof githubLink).toBe("string");

    expect(linkedinLink).toBeDefined();
    expect(typeof linkedinLink).toBe("string");
  });

  test("[POST] [/user/findByName/:name] it should be error thrown if trying to get a user that does not exist", async () => {
    const { body } = await request(server)
      .get("/user/findByName/test-Doe")
      .expect(404);

    const expectedErrorMessage = { error: "User does not exists" };

    expect(body).toEqual(expectedErrorMessage);
  });
});
