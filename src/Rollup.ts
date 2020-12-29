import { sep } from 'path';

export interface ChunkMatch {
  includes: Array<string>;
  match: Array<string>;
}

export type ChunkMap = Record<string, ChunkMatch>;

export function fixPath(name: string): string {
  return name.replace('/', sep);
}

export function chunkMap(map: ChunkMap, name: string): string {
  for (const [chunk, def] of Object.entries(map)) {
    for (const include of def.includes) {
      if (name.includes(include)) {
        return chunk;
      }
    }

    for (const match of def.match) {
      if (name.match(match)) {
        return chunk;
      }
    }
  }

  if (name.length === 30 && name.match(/^[a-f0-9]+$/)) {
    return 'vendor';
  }

  return 'unknown';
}
