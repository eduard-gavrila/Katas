//Deliberately unsorted array of coins
const coins = [{ value: 1, symbol: "p" }, { value: 200, symbol: "£" }, { value: 100, symbol: "£" }, { value: 50, symbol: "p" }, { value: 20, symbol: "p" }, { value: 2, symbol: "p" },]

//select the largest coin out of an array of coins
const findLargestCoinValue = (value, coins) => {
    //assume array unsorted so sort the array
    const sortedCoins = coins.sort((c1, c2) => c2.value - c1.value);
    return sortedCoins.find(coin => value >= coin.value);
}

const isInteger = (value) => value % 1 === 0;

const parseChangeGiven = (change) =>
    change.map(coinGroup =>
        coinGroup.coin.symbol === "£" ?
            (coinGroup.amount + " £" + coinGroup.coin.value / 100) :
            coinGroup.amount + " " + coinGroup.coin.value + "p"
    )


exports.giveChange = (amount) => {
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

    if (!isInteger(strippedAmount) || hasPoundSign) {
        numericValue *= 100
    };

    let changeGiven = [];

    while (numericValue > 0) {
        const largestCoin = findLargestCoinValue(numericValue, coins);
        const coinCount = Math.floor(numericValue / largestCoin.value);
        changeGiven.push({ coin: largestCoin, amount: coinCount })
        numericValue %= largestCoin.value;
    }

    return parseChangeGiven(changeGiven).join(", ");

};