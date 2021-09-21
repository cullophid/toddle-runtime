// type Signal<T> = {
//   map: <T2>(f: (t: T) => T2) => Signal<T2>;
//   get: () => T;
//   set: (t: T) => Signal<T>;
//   subscribe: (f: (t: T) => void) => () => void;
// };
import deepEqual from "fast-deep-equal";

export class Signal<T> {
  value: T;
  subscribers: Array<(value: T) => void>;
  subscriptions: Array<() => void>;
  constructor(value: T) {
    this.value = value;
    this.subscribers = [];
    this.subscriptions = [];
  }
  get() {
    return this.value;
  }
  set(value: T) {
    if (deepEqual(value, this.value) === false) {
      this.value = value;
      this.subscribers.forEach((f) => f(value));
    }
    return this;
  }
  subscribe(f: (value: T) => void) {
    this.subscribers.push(f);
    f(this.value);
    return () => {
      this.subscribers.splice(this.subscribers.indexOf(f), 1);
    };
  }
  destroy() {
    this.subscribers = [];
    this.subscriptions?.forEach((f) => f());
  }
  map<T2>(f: (value: T) => T2): Signal<T2> {
    const signal2 = signal(f(this.value));
    signal2.subscriptions.push(
      this.subscribe((value) => signal2.set(f(value)))
    );
    return signal2;
  }
}

export const signal = <T>(value: T) => new Signal(value);

(window as any).signal = signal;
(window as any).deepEqual = deepEqual;
