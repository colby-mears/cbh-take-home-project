const crypto = require("crypto");

const sha3512DigestWithHex = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event || !event.partitionKey)
    return !event
      ? TRIVIAL_PARTITION_KEY
      : sha3512DigestWithHex(JSON.stringify(event));

  const candidate =
    typeof event.partitionKey === "string"
      ? event.partitionKey
      : JSON.stringify(event);

  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? sha3512DigestWithHex(candidate)
    : candidate;
};
