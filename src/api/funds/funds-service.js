"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundsService = void 0;
var generateFunds = function () {
  return require("./sample-funds.json");
};
var allFunds = generateFunds();
var FundsService = /** @class */ (function () {
  function FundsService() {}
  FundsService.getAllFunds = function () {
    return allFunds;
  };
  FundsService.getAllHoldings = function () {
    return allFunds.reduce(function (holdings, fund) {
      return __spreadArray(__spreadArray([], holdings), fund.holdings);
    }, []);
  };
  FundsService.getFundsConsolidatedHoldings = function (name) {
    var firstHoldings = this.getFundsHoldingsByName(name);
    if (!!firstHoldings) {
      var allHoldings = this.getAllOfMyFundsHoldings(firstHoldings);
      if (!!allHoldings) {
        return this.consolidateHoldings(allHoldings);
      }
    }
  };
  FundsService.consolidateHoldings = function (allHoldings) {
    return allHoldings.reduce(function (holdingDictionary, holding) {
      if (!holdingDictionary.hasOwnProperty(holding.name)) {
        holdingDictionary[holding.name] = 0;
      }
      holdingDictionary[holding.name] += holding.weight;
      return holdingDictionary;
    }, {});
  };
  FundsService.getFundsHoldingsByName = function (name) {
    var fund = allFunds.find(function (currentFund) {
      return currentFund.name === name;
    });
    if (!!fund) {
      return fund.holdings;
    }
  };
  FundsService.getAllOfMyFundsHoldings = function (holdings) {
    if (!!holdings) {
      var subsequentFundsHoldings = this.getSubsequentHoldings(holdings);
      return __spreadArray(
        __spreadArray([], holdings),
        subsequentFundsHoldings
      );
    } else {
      return [];
    }
  };
  FundsService.getSubsequentHoldings = function (allHoldings) {
    var fundNames = this.checkForSubsequentFunds(allHoldings);
    var subsequentFundsHoldings = [];
    if (fundNames.length > 0) {
      subsequentFundsHoldings = this.findSubsequentHoldings(fundNames);
    } else {
      return subsequentFundsHoldings;
    }
    return __spreadArray(
      __spreadArray([], subsequentFundsHoldings),
      this.getSubsequentHoldings(subsequentFundsHoldings)
    );
  };
  FundsService.checkForSubsequentFunds = function (holdings) {
    var _this = this;
    return holdings.reduce(function (fundNames, holding) {
      if (!!_this.getFundByName(holding.name)) {
        return __spreadArray(__spreadArray([], fundNames), [holding.name]);
      }
      return fundNames;
    }, []);
  };
  FundsService.findSubsequentHoldings = function (fundNames) {
    var _this = this;
    return fundNames.reduce(function (acc, name) {
      var fundsHoldings = _this.getAllHoldingsForFund(name);
      if (!!fundsHoldings) {
        return __spreadArray(__spreadArray([], acc), fundsHoldings);
      } else {
        return __spreadArray([], acc);
      }
    }, []);
  };
  FundsService.getAllHoldingsForFund = function (name) {
    var allHoldings = this.getFundsHoldingsByName(name);
    if (!!allHoldings) {
      return allHoldings;
    }
  };
  FundsService.getFundByName = function (name) {
    return allFunds.find(function (currentFund) {
      return currentFund.name === name;
    });
  };
  return FundsService;
})();
exports.FundsService = FundsService;
