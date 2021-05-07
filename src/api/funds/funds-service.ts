import { Fund } from "./model/fund";
import { Holding } from "./model/holding";

const generateFunds: () => Fund[] = (): Fund[] => {
  return require("./sample-funds.json");
};

const allFunds: Fund[] = generateFunds();

export class FundsService {
  static getAllFunds(): Fund[] {
    return allFunds;
  }

  static getAllHoldings(): Holding[] {
    return allFunds.reduce((holdings: Holding[], fund: Fund) => {
      return [...holdings, ...fund.holdings];
    }, []);
  }

  static getFundsConsolidatedHoldings(
    name: string
  ): Record<string, number> | undefined {
    const firstHoldings: Holding[] | undefined = this.getFundsHoldingsByName(
      name
    );
    if (!!firstHoldings) {
      const allHoldings: Holding[] | undefined = this.getAllOfMyFundsHoldings(
        firstHoldings
      );
      if (!!allHoldings) {
        return this.consolidateHoldings(allHoldings);
      }
    }
  }

  private static consolidateHoldings(
    allHoldings: Holding[]
  ): Record<string, number> {
    return allHoldings.reduce(
      (holdingDictionary: Record<string, number>, holding: Holding) => {
        if (!holdingDictionary.hasOwnProperty(holding.name)) {
          holdingDictionary[holding.name] = 0;
        }
        holdingDictionary[holding.name] += holding.weight;
        return holdingDictionary;
      },
      {}
    );
  }

  private static getFundsHoldingsByName(name: string): Holding[] | undefined {
    const fund: Fund | undefined = allFunds.find(
      (currentFund: Fund) => currentFund.name === name
    );
    if (!!fund) {
      return fund.holdings;
    }
  }

  private static getAllOfMyFundsHoldings(
    holdings: Holding[]
  ): Holding[] | undefined {
    if (!!holdings) {
      const subsequentFundsHoldings = this.getSubsequentHoldings(holdings);
      return [...holdings, ...subsequentFundsHoldings];
    } else {
      return [];
    }
  }

  private static getSubsequentHoldings(allHoldings: Holding[]): Holding[] {
    const fundNames: string[] = this.checkForSubsequentFunds(allHoldings);
    let subsequentFundsHoldings: Holding[] = [];
    if (fundNames.length > 0) {
      subsequentFundsHoldings = this.findSubsequentHoldings(fundNames);
    } else {
      return subsequentFundsHoldings;
    }
    return [
      ...subsequentFundsHoldings,
      ...this.getSubsequentHoldings(subsequentFundsHoldings),
    ];
  }

  private static checkForSubsequentFunds(holdings: Holding[]): string[] {
    return holdings.reduce((fundNames: string[], holding: Holding) => {
      if (!!this.getFundByName(holding.name)) {
        return [...fundNames, holding.name];
      }
      return fundNames;
    }, []);
  }

  private static findSubsequentHoldings(fundNames: string[]): Holding[] {
    return fundNames.reduce((acc: Holding[], name: string) => {
      const fundsHoldings: Holding[] | undefined = this.getAllHoldingsForFund(
        name
      );
      if (!!fundsHoldings) {
        return [...acc, ...fundsHoldings];
      } else {
        return [...acc];
      }
    }, []);
  }

  private static getAllHoldingsForFund(name: string): Holding[] | undefined {
    const allHoldings: Holding[] | undefined = this.getFundsHoldingsByName(
      name
    );
    if (!!allHoldings) {
      return allHoldings;
    }
  }

  private static getFundByName(name: string): Fund | undefined {
    return allFunds.find((currentFund: Fund) => currentFund.name === name);
  }
}
