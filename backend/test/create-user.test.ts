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

describe("Tests cases for feature create user", () => {
  const server = app.server;

  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  beforeEach(() => {
    // reinicia base de dados antes de cada test
    execSync("npx prisma migrate reset --force");
  });

  test("[POST] [/user/create] it should be able create a new user", async () => {
    const newUserBody = {
      name: "John Doe",
      linkedinUrl: "https://www.linkedin.com/in/john-doe",
      githubUrl: "https://github.com/john-doe",
    };

    await request(server).post("/user/create").send(newUserBody).expect(204);
  });

  test("[POST] [/user/create] it should be throw error if forget a key 'name'", async () => {
    const newUserBody = {
      linkedinUrl: "https://www.linkedin.com/in/john-doe",
      githubUrl: "https://github.com/john-doe",
    };

    const { body: error } = await request(server)
      .post("/user/create")
      .send(newUserBody)
      .expect(400);

    const expectedErrorMessage = {
      error: { field: "name", message: "Required" },
    };

    expect(error).toEqual(expectedErrorMessage);
  });

  test("[POST] [/user/create] it should be throw error if forget a key 'linkedinUrl'", async () => {
    const newUserBody = {
      name: "John Doe",
      githubUrl: "https://github.com/john-doe",
    };

    const { body: error } = await request(server)
      .post("/user/create")
      .send(newUserBody)
      .expect(400);

    const expectedErrorMessage = {
      error: { field: "linkedinUrl", message: "Required" },
    };

    expect(error).toEqual(expectedErrorMessage);
  });

  test("[POST] [/user/create] it should be throw error if forget a key 'githubUrl'", async () => {
    const newUserBody = {
      name: "John Doe",
      linkedinUrl: "https://www.linkedin.com/in/john-doe",
    };

    const { body: error } = await request(server)
      .post("/user/create")
      .send(newUserBody)
      .expect(400);

    const expectedErrorMessage = {
      error: { field: "githubUrl", message: "Required" },
    };

    expect(error).toEqual(expectedErrorMessage);
  });

  test("[POST] [/user/create] it should be error thrown if trying to create a user that already exists", async () => {
    const newUserBody = {
      name: "John Doe",
      linkedinUrl: "https://www.linkedin.com/in/john-doe",
      githubUrl: "https://github.com/john-doe",
    };

    await request(server).post("/user/create").send(newUserBody).expect(204);

    const { body: error } = await request(server)
      .post("/user/create")
      .send(newUserBody)
      .expect(409);

    const expectedErrorMessage = { error: "User Already Exists" };

    expect(error).toEqual(expectedErrorMessage);
  });
});
