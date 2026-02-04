//@ts-nocheck

export function debounce<C>(
  callback: C,
  wait = 0
): C & { flush: () => void; cancel: () => void } {
  let debounceTimer: NodeJS.Timeout | undefined;
  let triggerArgs: unknown[];
  let triggerThis: unknown;

  function trigger(...arg: unknown[]) {
    triggerArgs = arg;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    triggerThis = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      callback.apply(triggerThis, triggerArgs);
    }, wait);
  }

  trigger.cancel = () => clearTimeout(debounceTimer);
  trigger.flush = () => {
    clearTimeout(debounceTimer);
    // @ts-expect-error - callback is a function
    callback.apply(triggerThis, triggerArgs);
  };

  return trigger;
}

export function throttle(callback: () => void, wait = 0) {
  let throttleTimer: NodeJS.Timeout | undefined;
  let triggerArgs: unknown[];
  let triggerThis: unknown;
  function trigger() {
    triggerArgs = [...arguments as unknown[]]; // eslint-disable-line prefer-rest-params
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    triggerThis = this;
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
      callback.apply(triggerThis, triggerArgs);
      throttleTimer = false;
    }, wait);
  }

  trigger.cancel = () => {
    clearTimeout(throttleTimer);
  };
  trigger.flush = () => {
    clearTimeout(throttleTimer);
    callback.apply(triggerThis, triggerArgs);
  };

  return trigger;
}

/**
 * @template F
 * @param  {...F} funcs
 */
export function compose<F>(...funcs: F[]) {
  if (!funcs.length) return (...args: any[]) => args;
  return funcs
    .slice()
    .reverse()
    .reduce(
      (a, b) =>
        (...args: any) =>
          a(b(...args))
    );
}

export function getRandomItems(list, numItems) {
  const randomItems = [];
  const listCopy = [...list]; // Create a copy of the original list to avoid modifying it

  for (let i = 0; i < numItems && listCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * listCopy.length); // Generate a random index within the remaining list
    const selectedItem = listCopy.splice(randomIndex, 1)[0]; // Remove the selected item from the list and add it to the result
    randomItems.push(selectedItem);
  }

  return randomItems;
}
