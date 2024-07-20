import { config } from 'dotenv';
config();

import router from "./Router";
import express, { Express } from "express";

const app: Express = express();

const port = process.env.PORT || 8080

app.use(express.json());
app.use(router);

app.listen(port, () => console.log("Connected"));

export default app;