import winston from "winston"


class LogManager {

    private _logger: winston.Logger;

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

    private _stringify(message: string | Error | JSON | unknown) {
        if (typeof (message) === 'string')
            return message;

        return JSON.stringify(message);
    }

}

export const logger = new LogManager();