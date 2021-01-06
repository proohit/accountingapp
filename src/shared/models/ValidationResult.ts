export type ValidationResult<T> = {
  [Key in keyof T]: string;
};
