import { logger } from './logManager';
import { config as configEnv } from 'dotenv'
/**
 * @desc A class to manage events when exiting or when errors occur.
 * @see https://nodejs.org/api/process.html#process_process_events
 */
export default class ProcessManager {

    static setEnvironmentVariables(): void {
        configEnv({ path: __dirname + '/../../../../.env' });
    }

    /**
     * @description Binds all useful event on the current NodeJS process.
     * *unhandledRejection* - event emitted when an uncaught JavaScript exception bubbles all the way back to the event loop.
     * *uncaughtException* -  event emitted whenever a Promise has been rejected and an error handler was attached to it
     * (using promise.catch(), for example) later than one turn of the Node.js event loop.
     * *warning* - Node.js can emit warnings whenever it detects bad coding practices
     * that could lead to sub-optimal application performance, bugs, or security vulnerabilities.
     * *exit* - The 'exit' event is emitted when the Node.js process is about to exit (process.exit() or no more work to perform).
     * *SIGINT* - From the terminal is supported on all platforms, and can usually be generated
     * with <Ctrl>+C (though this may be configurable). It is not generated when terminal raw mode is enabled.
     * @summary Binds events on process.
     */
    static eventInitialization(): void {

        process.on('unhandledRejection', (error: string | JSON) => {
            logger.error(error).then(process.exit(1)).catch(e => console.log(e));
        });

        process.on('uncaughtException', (error: string | Error) => {
            logger.error(error).then(process.exit(1)).catch(e => console.log(e));
        });

        process.on('warning', (error: string | Error) => {
            logger.warning(error).catch(e => console.log(e));
        });

    }

}