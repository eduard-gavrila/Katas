class CoinMachine {
  coinTypes = [
    { value: 1, symbol: "p" },
    { value: 2, symbol: "p" },
    { value: 5, symbol: "p" },
    { value: 10, symbol: "p" },
    { value: 20, symbol: "p" },
    { value: 50, symbol: "p" },
    { value: 100, symbol: "£" },
    { value: 200, symbol: "£" },
  ];
  constructor(initialCoinStock) {
    if (initialCoinStock) {
      initialCoinStock.forEach((coin) => {
        // We are not covering all types of invalidinput yet. For now we rely  at least on coin object having the correct shape

        //For now we are testing if the coin symbol and value are corect.
        //Is a coin type and symbol found in coin types?

        const foundCoinType = coinTypes.find(
          (coinType) => coinType.value === value && coinType.symbol === symbol
        );

        if (!foundCoinType) {
          throw new Error(
            "Machine can not accept loading coins in current format!"
          );
        }
      });

      this.coinStock = initialCoinStock;
    } else {
      this.coinStock = {};
    }
  }

  static findLargestCoinValue = (value, coinStock) => {
    //assume coinStock unsorted and  sort the array
    const sortedCoins = coinStock.sort((c1, c2) =>c2.value - c1.value)

    return sortedCoins.find((coin) => value >= coin.value)
  }

  static isInteger = (value) => value % 1 === 0;

  //change will be expressed in amount of pennies.
  static parseChangeGiven = (change) =>
    change.map((coinGroup) =>
      coinGroup.coin.symbol === "£"
        ? coinGroup.amount + " £" + coinGroup.coin.value / 100
        : coinGroup.amount + " " + coinGroup.coin.value + "p"
    );

  loadChange = (coinStock) => (this.coinStock = coinStock);

  giveChange = (amount) => {
    const currencyFormatPattern = /^£{0,1}\d+\.{0,1}(\d*$)/g;
    const isValidFormat = currencyFormatPattern.test(amount);
    const hasPoundSign = amount[0] === "£";

    if (!isValidFormat) {
      throw new Error("Incorrect input format!");
    }

    let strippedAmount = amount;

    if (hasPoundSign) {
      strippedAmount = amount.substring(1);
    }

    let numericValue = Number.parseFloat(strippedAmount);

    if (!CoinMachine.isInteger(strippedAmount) || hasPoundSign) {
      numericValue *= 100;
    }

    let changeGiven = [];

    while (numericValue > 0) {
      const largestCoin = CoinMachine.findLargestCoinValue(
        numericValue,
        this.coinStock
      );
      const coinCount = Math.floor(numericValue / largestCoin.value);
      changeGiven.push({ coin: largestCoin, amount: coinCount });
      numericValue %= largestCoin.value;
    }

    return CoinMachine.parseChangeGiven(changeGiven).join(", ");
  };
}

module.exports = CoinMachine;
