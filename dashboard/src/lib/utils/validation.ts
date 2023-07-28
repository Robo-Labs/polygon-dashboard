export const validateAddress = (address: string) => {
  const valid = /^0x[a-fA-F0-9]{40}$/.test(address);
  return valid;
};
