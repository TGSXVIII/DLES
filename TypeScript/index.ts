import express from "express";
import { routing } from "rout";
import dotenv from "dotenv";
import { ORMDb } from "ORMdb";
 
 
const server = async () => 
{
  dotenv.config();
  const prismaDb = new ORMDb();
  const app = express();
  app.use(express.json);
  app.use(express.urlencoded({ extended: false }));
  app.use(routing(prismaDb));
 
  app.listen(8080, () => 
  {
    console.log("API listening on port", 8080);
 
  });
};
 
server().catch((error) => console.error("Failed to start server", error));