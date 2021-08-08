import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { BaseError } from 'noicejs';
import { Writable } from 'stream';

import { encode } from './Buffer';
import { ChildProcessError } from './error/ChildProcessError';
import { NameValuePair } from './Map';
import { doesExist, Maybe } from './Maybe';

export interface ChildProcessOptions {
  cwd: string;
  env: Array<NameValuePair<string>>;
  timeout: number;
}

export interface ChildOptions extends ChildProcessOptions {
  args: Array<string>;
  command: string;
}

export interface ChildResult {
  status: number;
  stderr: string;
  stdout: string;
}

export type ChildStreams = ChildProcessWithoutNullStreams;
export type ChildSpawner = typeof spawn;

const CHILD_ENCODING = 'utf-8';
const CHILD_EVENT = 'child process emitted error event';
const CHILD_STATUS = 'child process exited with error status';
const CHILD_OUTPUT = 'child process emitted error output';

/**
 * Wait for a child process to exit, collecting output, errors, and exit status.
 *
 * @public
 */
export function childResult(child: ChildStreams): Promise<ChildResult> {
  return new Promise((res, rej) => {
    const stderr: Array<Buffer> = [];
    const stdout: Array<Buffer> = [];

    child.stderr.on('data', (chunk) => {
      stderr.push(chunk);
    });

    child.stdout.on('data', (chunk) => {
      stdout.push(chunk);
    });

    child.on('error', (err: Error | number) => {
      if (err instanceof Error) {
        rej(new ChildProcessError(CHILD_EVENT, err));
      }
    });

    child.on('close', (status: number) => {
      const errors = encode(stderr, CHILD_ENCODING);
      if (status > 0) {
        const msg = `${CHILD_STATUS}: ${status}`;
        rej(new ChildProcessError(msg, new BaseError(errors)));
        return;
      }

      if (errors.length > 0) {
        rej(new ChildProcessError(CHILD_OUTPUT, new BaseError(errors)));
        return;
      }

      res({
        status,
        stderr: errors,
        stdout: encode(stdout, CHILD_ENCODING),
      });
    });
  });
}

/**
 * @public
 * @deprecated
 */
export function waitForChild(child: ChildStreams): Promise<ChildResult> {
  return childResult(child);
}

export function writeInput(stream: Writable, value: string): Promise<boolean> {
  return new Promise<boolean>((res, rej) => {
    stream.write(value, (err: Maybe<Error>) => {
      if (doesExist(err)) {
        rej(err);
      } else {
        stream.end(() => {
          res(true);
        });
      }
    });
  });
}

/**
 * @public
 * @deprecated
 */
export function writeValue(stream: Writable, value: string): Promise<boolean> {
  return writeInput(stream, value);
}
