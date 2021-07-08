import { IsDate, IsObject } from 'class-validator';

export class NullHelper {
  public static recursivelyStripNullValues(value: unknown): unknown {
    if (Array.isArray(value)) {
      return value.map(this.recursivelyStripNullValues);
    }
    if (value !== null && IsDate(value)) {
      return value;
    }
    if (value !== null && IsObject(value)) {
      return Object.fromEntries(Object.entries(value).map(([key, value]) => [key, this.recursivelyStripNullValues(value)]));
    }
    if (value !== null) {
      return value;
    }
  }
}
