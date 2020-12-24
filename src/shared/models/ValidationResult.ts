export type ValidationResult<T, R> = {
  [Key in keyof T]: R;
};
