import { describe, expect } from "@jest/globals";
import { FundsService } from "./funds-service";
import { Holding } from "./model/holding";
import { Fund } from "./model/fund";
describe("Funds Service", () => {
  it("should getAllFunds", () => {
    // Given
    // When
    const actualFunds: Fund[] = FundsService.getAllFunds();
    // Then
    expect(actualFunds).toEqual(require("./sample-funds.json"));
  });
  it("should getAllHoldings", () => {
    // Given
    const expectedHoldings: Holding[] = [
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
    const actualHoldings: Holding[] = FundsService.getAllHoldings();
    // Then
    expect(actualHoldings).toEqual(expectedHoldings);
  });
  it("should getFundsConsolidatedHoldings", () => {
    // Given
    const expectedHoldings: Record<string, number> = {
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
    const actualHoldings:
      | Record<string, number>
      | undefined = FundsService.getFundsConsolidatedHoldings(
      "Ethical Global Fund"
    );
    // Then
    expect(actualHoldings).toEqual(expectedHoldings);
  });
});
