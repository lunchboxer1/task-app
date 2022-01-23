const calcTip = (total, tipPercent = 0.2) => total + (total * tipPercent);

const fToC = (temp) => (temp - 32) / 1.8;

const cToF = (temp) => (temp * 1.8) + 32;

const add = (a, b) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (a < 0 || b < 0) {
      return reject('Nums must be non negative')
    }
    resolve(a + b);
  }, 2000);
});

module.exports = {
  calcTip,
  fToC,
  cToF,
  add,
};
