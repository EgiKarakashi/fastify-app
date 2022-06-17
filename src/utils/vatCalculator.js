const vatCalculator = {
  calculateVat: (netAmount) => {
    return Math.round(netAmount * 0.2 * 1e2) / 1e2;
  },
  calculateGrossAmount: (netAmount) => {
    return Math.round(netAmount * 1.2 * 1e2) / 1e2;
  },
  calculateNetAmount: (grossAmount) => {
    return Math.round((grossAmount / 1.2) * 1e2) / 1e2;
  },
};

module.exports = vatCalculator;
