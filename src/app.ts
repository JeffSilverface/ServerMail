import express, { Application, Request, Response } from "express";
import cors from "cors";
import { sendMail } from "./services/sendMail";

const app: Application = express();
const port: number = 5000;

interface FormValues {
  Name: string;
  Email: string;
  Subject: string;
  Message: string;
}

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/mail", (req: Request, res: Response) => {
  sendMail(req.body);

  res.send("ok");
  res.end;
});

app.listen(port, () => {
  console.log(`connected successfully on port ${port}`);
});
