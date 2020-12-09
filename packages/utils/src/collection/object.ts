export const removePropertyFromObject = (obj, prop) => {
  const { [prop]: omit, ...res } = obj;
  return res;
};
