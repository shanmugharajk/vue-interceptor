export const sleep = (ms = 100) =>
  new Promise(resolve => setTimeout(() => resolve(true), ms));
