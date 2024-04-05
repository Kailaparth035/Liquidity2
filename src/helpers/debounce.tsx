export const Debounce = (func: any, delay: number) => {
  let timeout: any;
  return (...args: any) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
