import express, { Request, Response } from "express";
import { FundsService } from "./api";

const app = express();
app.get("/api/funds", (req: Request, res: Response) => {
  res.send(FundsService.getAllFunds());
});

app.get("/api/holdings", (req: Request, res: Response) => {
  res.send(FundsService.getAllHoldings());
});

app.get("/api/consolidated-holdings", (req: Request, res: Response) => {
  res.send(FundsService.getFundsConsolidatedHoldings("Ethical Global Fund"));
});

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
