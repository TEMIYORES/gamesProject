export const Guid = (length = 9) => {
  const alphaMap =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let i = 0;
  let str = "";
  while (i < length) {
    str += alphaMap[Math.floor(Math.random() * alphaMap.length)];
    i++;
  }
  return str;
};
