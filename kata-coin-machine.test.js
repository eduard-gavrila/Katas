const {giveChange} = require("./kata-coin-machine");

describe("GiveChange function tests", () => {
    test("Throws an error when input is not in acceptable format.", () => {
        //valid values
        expect(() => giveChange("£2")).not.toThrow();
        expect(() => giveChange("253")).not.toThrow();
        expect(() => giveChange("5.23")).not.toThrow();
        //invalid values 
        expect(() => giveChange("$23")).toThrow();
        expect(() => giveChange("")).toThrow();
        expect(() => giveChange("0.25g")).toThrow();
        //expect(() => giveChange("5.")).toThrow();

    })
    test("Returns the correct change.", () => {
        expect(giveChange("£2")).toEqual("1 £2");
        expect(giveChange("253")).toEqual("1 £2, 1 50p, 1 2p, 1 1p");
        expect(giveChange("5.23")).toEqual("2 £2, 1 £1, 1 20p, 1 2p, 1 1p");
      
    })


});