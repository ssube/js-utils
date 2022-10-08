/**
 * Whether items should be checked for inclusion (allow list) or exclusion (deny list).
 *
 * @public
 */
export enum ChecklistMode {
  INCLUDE = 'include',
  EXCLUDE = 'exclude',
}

/**
 * Mode of operation and items to check.
 *
 * @public
 */
export interface ChecklistOptions<T> {
  data: Array<T>;
  mode: ChecklistMode;
}

/**
 * Check whether items are included or not.
 *
 * @public
 */
export class Checklist<T> implements ChecklistOptions<T> {
  /**
   * TODO: switch to Set
   */
  public readonly data: Array<T>;
  public readonly mode: ChecklistMode;

  constructor(options: ChecklistOptions<T>) {
    this.data = Array.from(options.data);
    this.mode = options.mode;
  }

  /**
   * Check whether a value is included or excluded from this checklist (depending on `mode`).
   */
  public check(value: T): boolean {
    switch (this.mode) {
      case ChecklistMode.INCLUDE:
        return this.data.includes(value);
      case ChecklistMode.EXCLUDE:
      default:
        return (this.data.includes(value) === false);
    }
  }
}
