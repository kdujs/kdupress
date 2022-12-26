import Kdu from 'kdu'

export declare class Store {
  store: Kdu;

  $get(key: string): any;

  $set(key: string, value: any): void;

  $emit: typeof Kdu.prototype.$emit;

  $on: typeof Kdu.prototype.$on;
}
