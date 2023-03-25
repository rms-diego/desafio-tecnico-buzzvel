import { app } from "./app";

const { PORT } = process.env;

app.listen({ port: +PORT!, host: "0.0.0.0" }, (error, address) => {
  if (error) throw new Error(error.message);

  console.log(`Server is running\nlink: ${address}`);
});
