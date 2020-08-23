export const sleep = (ms = 100) =>
  new Promise(resolve => setTimeout(() => resolve(true), ms));

export const isEmpty = (obj: unknown) => {
  if (typeof obj === 'undefined' || obj === null) {
    return false;
  }

  if (
    (obj as unknown[]).length === 0 ||
    Object.keys(obj as { [k: string]: unknown }).length === 0
  ) {
    return false;
  }
};
