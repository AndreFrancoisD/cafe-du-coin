
import express, { Request, Response, NextFunction } from 'express';
import { Games } from './games';
import configfile from '../../../config/config.json';
import packagefile from '../../../package.json';
import { Authentication } from './authentication/authenticationManager';

/**
 * Configuration file for GRAYLOG, SERVER, etc.
 */
const config = configfile;

export const router = express.Router();

/**
 * API DOCUMENTATION
 */
router.use(config.routes['v1:documentation'], express.static('doc/v1'));

/**
 * Authentication
 */
const auth = new Authentication();

router.post(config.routes['v1:login'], auth.getTokenMiddleware());

/**
 * API GAMES
 */
const games = new Games();

router.get(config.routes['v1:game:list'], auth.authenticateTokenMiddleware(), games.getGameListMiddleware());

router.get(config.routes['v1:game'], auth.authenticateTokenMiddleware(), games.getGameDetailMiddleware());

router.put(config.routes['v1:game'], auth.authenticateTokenMiddleware(), games.updateGameMiddleware());





/**
* ADD ERROR MANAGEMENT
*/
router.use((error: Error, req: Request, res: Response, next: NextFunction) => {

    if (res.headersSent) {
        return next(error);
    }

    //logger.error(error.stack ? error.stack : JSON.stringify(error));

    res.status(500).json({ error: error.message ?? JSON.stringify(error) });
});