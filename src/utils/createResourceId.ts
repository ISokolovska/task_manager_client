const createResourceId = (): number => {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return arr[0] / (0xffffffff + 1);
};

export default createResourceId;
