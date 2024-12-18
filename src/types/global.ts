type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export interface LocalResponse<T> {
  data: T;
  status: number;
  message: string;
  error: boolean;
}
