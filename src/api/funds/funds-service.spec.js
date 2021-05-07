"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var funds_service_1 = require("./funds-service");
globals_1.describe("Funds Service", function () {
  it("should getAllFunds", function () {
    // Given
    // When
    var actualFunds = funds_service_1.FundsService.getAllFunds();
    // Then
    globals_1.expect(actualFunds).toEqual(require("./sample-funds.json"));
  });
  it("should getAllHoldings", function () {
    // Given
    var expectedHoldings = [
      { name: "Fund B", weight: 0.2 },
      { name: "Fund C", weight: 0.5 },
      { name: "Fund D", weight: 0.15 },
      { name: "GrapeCo", weight: 0.15 },
      { name: "MicroFit", weight: 0.5 },
      { name: "GreenCo", weight: 0.3 },
      { name: "GrapeCo", weight: 0.2 },
      { name: "Fund D", weight: 0.4 },
      { name: "GrapeCo", weight: 0.3 },
      { name: "GoldenGadgets", weight: 0.3 },
      { name: "Fund E", weight: 0.1 },
      { name: "SpaceY", weight: 0.3 },
      { name: "BeanzRUS", weight: 0.6 },
      { name: "GrapeCo", weight: 0.2 },
      { name: "SolarCorp", weight: 0.8 },
    ];
    // When
    var actualHoldings = funds_service_1.FundsService.getAllHoldings();
    // Then
    globals_1.expect(actualHoldings).toEqual(expectedHoldings);
  });
  it("should getFundsConsolidatedHoldings", function () {
    // Given
    var expectedHoldings = {
      BeanzRUS: 1.2,
      "Fund B": 0.2,
      "Fund C": 0.5,
      "Fund D": 0.55,
      "Fund E": 0.2,
      GoldenGadgets: 0.3,
      GrapeCo: 1.0499999999999998,
      GreenCo: 0.3,
      MicroFit: 0.5,
      SolarCorp: 1.6,
      SpaceY: 0.6,
    };
    // When
    var actualHoldings = funds_service_1.FundsService.getFundsConsolidatedHoldings(
      "Ethical Global Fund"
    );
    // Then
    globals_1.expect(actualHoldings).toEqual(expectedHoldings);
  });
});
