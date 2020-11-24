const customLevels = {
    levels: {
      trace: 5,
      debug: 4,
      info: 3,
      warn: 2,
      error: 1,
      fatal: 0,
    },
    colors: {
      trace: 'white',
      debug: 'green',
      info: 'green',
      warn: 'yellow',
      error: 'red',
      fatal: 'red',
    },
   };

   class Logger {
    constructor(logger) {
        this.logger = logger;
    }
    trace(msg, meta) {
      this.logger.log('trace', msg, meta);
    }
    debug(msg, meta) {
      this.logger.debug(msg, meta);
    }
    info(msg, meta) {
      this.logger.info(msg, meta);
    }
    warn(msg, meta) {
      this.logger.warn(msg, meta);
    }
    error(msg, meta) {
      this.logger.error(msg, meta);
    }
    fatal(msg, meta) {
      this.logger.log('fatal', msg, meta);
    }
   }
   export const logger = new Logger();