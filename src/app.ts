import express from "express";
import * as dotenv from "dotenv";
//import * as dotenvSafe from "dotenv-safe";

//dotenvSafe.config();

const port = parseInt(process.env.PORT as string, 10);
const apiKey = process.env.API_KEY as string;

console.log(port); // Output: the value of the PORT environment variable as a number
console.log(apiKey); // Output: the value of the API_KEY environment variable

const app = express();



app.get("/", (req, res) => {
  //res.status(200).json({ message: "Hello World" });
  res.send("Imprimir en pantalla!");
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});