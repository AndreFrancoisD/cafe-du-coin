import winston from "winston"

/**
 * @description
 * Creates a logger to log (obvioulsy!) the errors/infos.
 * It uses Winston that cn connect to an external lo tool (graylog for example).
 * In this case it is a simple console logger.
 * Three levels are defined: error, warning, info. Warning is not used in the application.
 * A singleton is created to use in the whole application.
 */
class LogManager {

    private _logger: winston.Logger;
    /**
     * Create the Winston logger
     */
    constructor() {

        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console({ format: winston.format.simple(), })
            ]
        });
    }

    /**
     * Logs an info
     * @param message message string to log
     * @returns Promise<void>
     */
    info(message: string | Error | JSON | unknown) {
        const strMessage = this._stringify(message);
        return new Promise<void>((resolve, reject) => {
            this._logger.info(strMessage, (err: Error) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        })

    }

    /**
     * Logs an error
     * @param message message string or error to log
     * @returns Promise<void>
     */
    error(message: string | Error | JSON | unknown) {
        const strMessage = this._stringify(message);
        return new Promise<void>((resolve, reject) => {
            this._logger.error(strMessage, (err: Error) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        })

    }

     /**
     * Logs a warning
     * @param message message string or error to log
     * @returns Promise<void>
     */
    warning(message: string | Error | JSON | unknown) {
        const strMessage = this._stringify(message);
        return new Promise<void>((resolve, reject) => {
            this._logger.warning(strMessage, (err: Error) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        })

    }

    // Simple méthode pour l'exempmle mais on perd la stack ici
    private _stringify(message: string | Error | JSON | unknown) {
        if (typeof (message) === 'string')
            return message;

        return JSON.stringify(message);
    }

}

export const logger = new LogManager();