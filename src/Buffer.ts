import { sum } from './Predicate';

export type AllowedBufferEncoding = 'ascii' | 'utf-8';

/**
 * Concatenate a list of buffers.
 *
 * @public
 */
export function concat(chunks: Array<Buffer>): Buffer {
  const total = chunks.map((it) => it.length).reduce(sum, 0);
  return Buffer.concat(chunks, total);
}

/**
 * Concatenate then encode a list of buffers.
 *
 * @public
 */
export function encode(chunks: Array<Buffer>, encoding: AllowedBufferEncoding): string {
  if (chunks.length === 0) {
    return '';
  }

  return concat(chunks).toString(encoding);
}
