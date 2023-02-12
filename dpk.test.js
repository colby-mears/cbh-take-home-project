const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' given a null input", () => {
    const trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");
  });

  it("Returns the hashed value of input, given an integer", () => {
    const trivialKey = deterministicPartitionKey(1);
    expect(trivialKey).toBe(
      "ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa"
    );
  });

  it("Returns the stringified event value, given an event object without a partition key", () => {
    const event = "FIFY";
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(
      "b9aea0a1d5632c14a8c5043ebf31f957d18eff41a16af533cc88669f1853245f973580e5b5a9cc4d84957fb31e6268d906ee9a21de849a5a160a65bfb6429cb2"
    );
  });
});
