import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createPetClient } from "./sdk";

dotenv.config();

const app: Express = express();
const port = "8080";

app.get("/", async (req: Request, res: Response) => {
  const client = await createPetClient();
  const pets = await client.findPetsByStatus({ status: "available" });
  console.log("pets", pets);
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
