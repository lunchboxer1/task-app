const {
  calcTip,
  cToF,
  fToC,
  add,
} = require('../src/math');

test('Should calculate total with tip', () => {
  const total = calcTip(10, 0.30);
  expect(total).toBe(13);
});

test('SHould calculate totial with defualt tip', () => {
  const total = calcTip(10);
  expect(total).toBe(12);
});

test('Should convert celsisus to farenheight', () => {
  const result = cToF(85);
  expect(result).toBe(185);
});

test('Should convert farenheight to celsius.', () => {
  const result = fToC(86);
  expect(result).toBe(30);
});

// test('Async test demo', (done) => {
//   setTimeout(() => {
//     expect(1).toBe(1);

//     done();
//   }, 2000);
// });

test('Should add two numbers after 2 seconds.', (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test('Should add two numbers async/await', async () => {
  const result = await add(2, 3);
  expect(result).toBe(5);
});
