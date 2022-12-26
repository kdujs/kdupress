import { Store } from './Store'
import { AsyncComponent } from 'kdu'

declare class KduPress extends Store {
  isPageExists (pageKey: string): boolean;

  isPageLoaded (pageKey: string): boolean;

  getPageAsyncComponent (pageKey: string): () => Promise<AsyncComponent>;

  loadPageAsyncComponent (pageKey: string): Promise<AsyncComponent>;

  registerPageAsyncComponent (pageKey: string): void;
}

declare module 'kdu/types/kdu' {
  export interface Kdu {
    $kdupress: KduPress;
  }
}
