import express, { Application, Request, Response } from "express";
import { sendMail } from "./services/sendMail";

const path = require("path");

const app: Application = express();
const port = process.env.PORT || 3000;

const cors = require("cors");

exports.app = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "client/")));
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/mail", (req: Request, res: Response) => {
  console.log("reception ok");
  sendMail(req.body)
    .then((ok) => {
      res.send(true);
    })
    .catch((err) => {
      res.send(false);
    });

  res.end;
});

app.listen(port, () => {
  console.log(`connected successfully on port ${port}`);
});
