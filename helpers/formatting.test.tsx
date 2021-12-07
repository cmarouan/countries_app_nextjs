import { numberWithCommas } from './formatting';
import { mapKeysToString } from './formatting';

describe("Format function", () => {
  it("Shoud equal the correct keys as a string", () => {
    const currencies = { 'EUR': ['eur'], 'DOLLAR': ['DO'] };
    expect(mapKeysToString(currencies)).toEqual('EUR,DOLLAR');
  });
  it("Shoud equal the correct transformed number value", () => {
    const number = 2022;
    expect(numberWithCommas(number)).toEqual('2,022');
  });
});