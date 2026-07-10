function randomLetters(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

function generateReference() {
  const prefix = "WFDI";
  const year = new Date().getFullYear();
  const firstPart = `${randomLetters(1)}${Math.floor(100 + Math.random() * 900)}`;
  const secondPart = randomLetters(3);

  return `${prefix}-${year}-${firstPart}-${secondPart}`;
}


module.exports = {
    generateReference
}