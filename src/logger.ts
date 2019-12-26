import clc from 'cli-color';
import { getTimeString } from './time';

interface Logger {
  trace: Function;
  debug: Function;
  info: Function;
  warn: Function;
  error: Function;
  fatal: Function;
  ok: Function;
  create?: Function;
}

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'ok';

const colors: Logger = {
  trace: clc.bold,
  debug: clc.cyan.bold,
  info: clc.blue.bold,
  ok: clc.green.bold,
  warn: clc.yellow.bold,
  error: clc.red.bold,
  fatal: clc.red.bold,
};

const LEVELS = {
  TRACE: 1,
  DEBUG: 2,
  INFO: 3,
  OK: 4,
  WARN: 5,
  ERROR: 6,
  FATAL: 7,
};

const printTime = () => getTimeString();
const printName = (name: string) => clc.cyan(`[${name}]`);
const printLevel = (level: string) => colors[level](`${level.toUpperCase()}`);

interface LoggerOptions {
  defaultLevel: LogLevel;
}

interface InitOptions {
  name?: string;
  defaultLevel?: LogLevel;
  browser?: boolean;
}
/**
 * Create a new Logger
 */
const createLoggerModule = (opts: LoggerOptions) => (
  {
    name = '',
    level = opts.defaultLevel,
  }: { name?: string; level?: LogLevel } = {
    name: '',
    level: opts.defaultLevel,
  }
) => {
  const options = {
    name,
    level: level.toUpperCase(),
  };

  /**
   *
   * @param {string} msg
   * @param {Function} logMethod
   * @param {LogLevel} level
   */
  const logIfSafe = (msg: any[], logMethod: Function, level: LogLevel) => {
    const upperLevel = level.toUpperCase();
    if (LEVELS[upperLevel] >= LEVELS[options.level]) {
      const prefix = `${printTime()} | ${printName(name)} ${printLevel(level)}`;
      logMethod(prefix, clc.bold(msg[0]), ...msg.slice(1));
    }
  };
  // Create result object
  const result: any = (...msg: any[]) => result.debug(...msg);

  Object.keys(LEVELS).forEach(key => {
    const keyLower = key.toLowerCase() as LogLevel;
    let consoleMethod = console.log;
    if (console[keyLower]) {
      consoleMethod = console[keyLower];
    }
    result[keyLower] = (...msg: any[]) =>
      logIfSafe(msg, consoleMethod, keyLower);
  });

  // eslint-disable-next-line no-console
  result.ok = (...msg: any[]) => logIfSafe(msg, console.log, 'ok');

  result.create = createLoggerModule(opts);

  result.debug(`Created ${name} logger with level ${level.toUpperCase()}`);
  return result;
};

/**
 * Initialize depending on environment
 */
const init = (opts: InitOptions = {}) => {
  const createLogger: Function = createLoggerModule({
    defaultLevel: opts.defaultLevel || 'info',
  });

  const internalLogger = createLogger({ name: 'Logger' });
  internalLogger.debug(`Using "${opts.browser ? 'a Browser' : 'Node'}"`);

  return createLogger({ name: opts.name || '' });
};

export default init;
