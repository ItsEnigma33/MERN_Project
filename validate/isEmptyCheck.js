const isEmptyCheck = data => {
  return (
    data === undefined ||
    data === null ||
    data === "" ||
    (typeof data === "string" && data.trim().length === 0) ||
    (typeof data === "object" && Object.keys(data).length === 0)
  );
};

module.exports = isEmptyCheck;
