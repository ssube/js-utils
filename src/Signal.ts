/**
 * @public
 */
export const SIGNAL_RELOAD: NodeJS.Signals = 'SIGHUP';

/**
 * @public
 */
export const SIGNAL_RESET: NodeJS.Signals = 'SIGINT';

/**
 * @public
 */
export const SIGNAL_STOP: NodeJS.Signals = 'SIGTERM';

/**
 * Wait for an OS signal.
 *
 * @returns the fired signal
 * @public
 */
export function signal(...signals: Array<NodeJS.Signals>): Promise<NodeJS.Signals> {
  return new Promise((res, _rej) => {
    function handler(fired: NodeJS.Signals) {
      for (const s of signals) {
        process.removeListener(s, handler);
      }
      res(fired);
    }

    for (const sig of signals) {
      process.on(sig, handler);
    }
  });
}
