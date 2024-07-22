enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;

  private constructor() {
    this.logLevel = LogLevel.INFO;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  public log(...args: unknown[]): void {
    console.log(...args);
  }

  public error(...args: unknown[]): void {
    if (this.logLevel >= LogLevel.ERROR) {
      console.error(...args);
    }
  }

  public warn(...args: unknown[]): void {
    if (this.logLevel >= LogLevel.WARN) {
      console.warn(...args);
    }
  }

  public info(...args: unknown[]): void {
    if (this.logLevel >= LogLevel.INFO) {
      console.info('INFO:', ...args);
    }
  }

  public debug(...args: unknown[]): void {
    if (this.logLevel >= LogLevel.DEBUG) {
      console.debug('DEBUG:', ...args);
    }
  }
}

export const logger = Logger.getInstance();
