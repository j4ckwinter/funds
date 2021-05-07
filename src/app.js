"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = require("./api");
var app = express_1.default();
app.get("/api/funds", function (req, res) {
  res.send(api_1.FundsService.getAllFunds());
});
app.get("/api/holdings", function (req, res) {
  res.send(api_1.FundsService.getAllHoldings());
});
app.get("/api/consolidated-holdings", function (req, res) {
  res.send(
    api_1.FundsService.getFundsConsolidatedHoldings("Ethical Global Fund")
  );
});
app.listen(3000, function () {
  console.log("The application is listening on port 3000!");
});
