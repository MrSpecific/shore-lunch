import type { ComponentProps as ReactComponentProps } from 'react';

export {};

declare global {
  interface Window {
    clipboardData: any;
  }

  type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

  type PromiseReturnType<T> = T extends PromiseLike<infer U> ? U : T;

  type PickOptional<T, OptionalKeys extends keyof T> = Partial<Pick<T, OptionalKeys>>;

  type PickRequiredOptional<T, RequiredKeys extends keyof T, OptionalKeys extends keyof T> = Pick<
    T,
    RequiredKeys
  > &
    Partial<Pick<T, OptionalKeys>>;

  type SomeRequired<T, RequiredKeys extends keyof T> = Pick<T, RequiredKeys> &
    Partial<Omit<T, RequiredKeys>>;

  type SomeOptional<T, OptionalKeys extends keyof T> = Omit<T, OptionalKeys> &
    Partial<Pick<T, OptionalKeys>>;

  type OneOf<T, U> = (T & { [K in keyof U]?: never }) | (U & { [K in keyof T]?: never });

  type ComponentProps<T> = ReactComponentProps<T>;
}
