
import express, { Request, Response, NextFunction } from 'express';
import { GameManager } from './games';
import configfile from '../../../config/config.json';
import packagefile from '../../../package.json';
import { Authentication } from './authentication/authenticationManager';
import { GameHistoryManager } from './history';
import { logger } from '../logManager';

/**
 * This file defines a specific router for the API v1
 */

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
const games = new GameManager();

router.get(config.routes['v1:game:list'], auth.authenticateTokenMiddleware(), games.getGameListMiddleware());

router.get(config.routes['v1:game'], auth.authenticateTokenMiddleware(), games.getGameDetailMiddleware());

router.put(config.routes['v1:game'], auth.authenticateTokenMiddleware(), games.updateGameMiddleware());

/**
 * API HISTORY
 */
const history = new GameHistoryManager();

router.get(config.routes['v1:history'], auth.authenticateTokenMiddleware(), history.getGameHistorytMiddleware())


/**
* ADD ERROR MANAGEMENT
*/
router.use((error: Error, req: Request, res: Response, next: NextFunction) => {

    if (res.headersSent) {
        return next(error);
    }

    logger.error(error.stack ? error.stack : JSON.stringify(error));

    res.status(500).json({ error: error.message ?? JSON.stringify(error) });
});