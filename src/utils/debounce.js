export default function createDebounce(func, delay = 500) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, delay);
  };
}