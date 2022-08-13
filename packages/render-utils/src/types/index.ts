import { MittEmitter as NextMittEmitter } from 'next/dist/shared/lib/mitt';

export type MittEmitter = NextMittEmitter<
  | 'beforeHistoryChange'
  | 'routeChangeStart'
  | 'routeChangeComplete'
  | 'routeChangeError'
  | 'hashChangeStart'
  | 'hashChangeComplete'
>;

export interface Media {
  active: boolean;
  isPending: boolean;
  className: string;
}
