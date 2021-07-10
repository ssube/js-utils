import { setOrPush } from './Map';

export interface ArrayMapperOptions {
  /**
   * Key for any remaining, unmatched elements.
   */
  rest: string;
  /**
   * Number of initial elements to skip.
   */
  skip: number;
  /**
   * List of element keys.
   */
  take: Array<string>;
}

/**
 * Map an array of items into a map of arrays using the specified keys, able to `skip` initial items and gather
 * remaining items into a `rest` key.
 *
 * @public
 */
export class ArrayMapper {
  public readonly rest: string;
  public readonly skip: number;
  public readonly take: Array<string>;

  constructor(options: ArrayMapperOptions) {
    this.rest = options.rest;
    this.skip = options.skip;
    this.take = Array.from(options.take);
  }

  /**
   * Transform the input list into a map, extracting elements using the mapper's options.
   *
   * @public
   */
  public map(input: Array<string>): Map<string, Array<string>> {
    const result = new Map();
    input.forEach((it, idx) => {
      if (idx < this.skip) {
        return;
      }

      const skipdx = idx - this.skip;
      if (skipdx < this.take.length) {
        setOrPush(result, this.take[skipdx], it);
      } else {
        setOrPush(result, this.rest, it);
      }
    });

    if (result.has(this.rest) === false) {
      result.set(this.rest, []);
    }

    return result;
  }
}
