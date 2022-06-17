const vatCalculator = require("../src/utils/vatCalculator");

describe("VAT Calculator", function () {
  test("Should return the correct VAT", function () {
    // arrange and act
    const result = vatCalculator.calculateVat(16.67);
    // assert
    expect(result).toBe(3.33);
  });

  test("Should return correct gross amount of 20% VAT", function () {
    // arrange and act
    const result = vatCalculator.calculateGrossAmount(16.67);
    // assert
    expect(result).toBe(20.0);
  });

  test("Should return correct net amount for 20% VAT", function () {
    // arrange and act
    const result = vatCalculator.calculateNetAmount(20.0);
    // assert
    expect(result).toBe(16.67);
  });
});
