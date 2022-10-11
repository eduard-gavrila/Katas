const  CoinMachine  = require("./kata-coin-machine");

describe("Given coinMachine", () => {
  let coinMachine;
  beforeEach(() => {
    coinMachine = new CoinMachine();
    coinMachine.loadChange([
      { value: 1, symbol: "p", amount: 30 },
      { value: 2, symbol: "p", amount: 30 },
      { value: 5, symbol: "p", amount: 20 },
      { value: 10, symbol: "p", amount: 20 },
      { value: 20, symbol: "p", amount: 10 },
      { value: 50, symbol: "p", amount: 10 },
      { value: 100, symbol: "£", amount: 10 },
      { value: 200, symbol: "£", amount: 5 },
    ]);
  });

  describe("When calling coinMachine.giveChange()", () => {
    test("Then it throws an error when input is not in acceptable format.", () => {
      //valid values
      expect(() => coinMachine.giveChange("£2")).not.toThrow();
      expect(() => coinMachine.giveChange("253")).not.toThrow();
      expect(() => coinMachine.giveChange("5.23")).not.toThrow();
      //invalid values
      expect(() => coinMachine.giveChange("$23")).toThrow();
      expect(() => coinMachine.giveChange("")).toThrow();
      expect(() => coinMachine.giveChange("0.25g")).toThrow();
      //expect(() => coinMachine.giveChange("5.")).toThrow();
    });
  });

  describe("When calling coinMchine.giveGhange() with correct input", () => {
    test("Then in returns the correct change.", () => {
      expect(coinMachine.giveChange("£2")).toEqual("1 £2");
      expect(coinMachine.giveChange("253")).toEqual("1 £2, 1 50p, 1 2p, 1 1p");
      expect(coinMachine.giveChange("5.23")).toEqual("2 £2, 1 £1, 1 20p, 1 2p, 1 1p");
    });
  });
});
