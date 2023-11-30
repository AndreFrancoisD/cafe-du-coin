
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
/**
 * @api {post} v1/auth/token Fetch the token.
 * @apiName getTokenMiddleware
 * @apiGroup Authentication
 * @apiDescription
 * Fetch the tocken for a user.
 * @apiBody {String} [username] User name.
 * @apiBody {String} [password] User password.
 * 
 * @apiSuccessExample Success-Response:
 * 200 OK
 * {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3RuYW1lIjoiSm9obiIsImxhc3RuYW1lIjoiU21pdGgiLCJlbWFpbCI6ImpvaG5zbWl0aEBlbWFpbC5jb20iLCJwd2QiOiI4OWUwMTUzNmFjMjA3Mjc5NDA5ZDRkZTFlNTI1M2UwMWY0YTE3NjllNjk2ZGIwZDYwNjJjYTliOGY1Njc2N2M4IiwiaWF0IjoxNzAxMzQwNTE2LCJleHAiOjE3MDEzNDIzMTZ9.-Go72ogjFrUbaBzqITemWkDl0LBcV4d5LTj1FcaX3Kc"
   }
 * 
 * @apiError (404) NotFoundError
 * @apiErrorExample
 *    404 Not Found
 *     {
            "error": "NotFoundError"
 *     } 
 */
router.post(config.routes['v1:login'], auth.getTokenMiddleware());

/**
 * API GAMES
 */
const games = new GameManager();
/**
 * @api {get} v1/game Get the game list.
 * @apiName getGameListMiddleware
 * @apiGroup Game
 * @apiDescription
 * Gets the list of the game.
 * 
 * @apiSuccessExample Success-Response:
 * 200 OK
 * [ {
        "id": 170,
        "title": "50 Missions",
        "returned": true
    },
    {
        "id": 130,
        "title": "7 Wonders - Nouvelle ├®dition",
        "returned": true
    },
    {
        "id": 134,
        "title": "7 Wonders : Architects",
        "returned": true
    }]    
 * 
 * @apiError (404) NotFoundError
 * @apiErrorExample
 *    404 Not Found
 *     {
            "error": "NotFoundError"
 *     } 
 */
router.get(config.routes['v1:game:list'], auth.authenticateTokenMiddleware(), games.getGameListMiddleware());

/**
 * @api {get} v1/game/:gameid Get a game info.
 * @apiName getGameDetailMiddleware
 * @apiGroup Game
 * @apiDescription
 * Gets the information about a game
 * @apiParam {Number} [gameid] Game Id.
 * @apiSuccessExample Success-Response:
 * 200 OK
 * [ {
        "id": 170,
        "title": "50 Missions",
        "returned": true
    }]    
 * 
 * @apiError (404) NotFoundError
 * @apiErrorExample
 *    404 Not Found
 *     {
            "error": "NotFoundError"
 *     } 
 */
router.get(config.routes['v1:game'], auth.authenticateTokenMiddleware(), games.getGameDetailMiddleware());

/**
 * @api {put} v1/game/:gameid Update status game (available or not).
 * @apiName updateGameMiddleware
 * @apiGroup Game
 * @apiDescription
 * Change the status of a game: borrowed or available.
 * @apiParam {Number} [gameid] Game Id.
 * @apiBody {Boolean} [returned] true if the game is returned, else if it is not available.
 * @apiSuccessExample Success-Response:
 * 200 OK
 * OK  
 *
 * @apiError (404) NotFoundError
 * @apiErrorExample
 *    404 Not Found
 *     {
            "error": "NotFoundError"
 *     } 
 */
router.put(config.routes['v1:game'], auth.authenticateTokenMiddleware(), games.updateGameMiddleware());

/**
 * API HISTORY
 */
const history = new GameHistoryManager();
/**
 * @api {get} v1/game Get the lending history of a game.
 * @apiName getGameHistorytMiddleware
 * @apiGroup History
 * @apiDescription
 * Get the lending history of a game with the borrow date and the return date if returned.
 * 
 * @apiSuccessExample Success-Response:
 * 200 OK
 * [    {
        "id": 100,
        "borrow_date": "2023-11-29T23:00:00.000Z",
        "return_date": "2023-11-29T23:00:00.000Z",
        "title": "50 Missions"
    },
    {
        "id": 101,
        "borrow_date": "2023-11-29T23:00:00.000Z",
        "return_date": null,
        "title": "50 Missions"
    }]  
 * 
 * @apiError (404) NotFoundError
 * @apiErrorExample
 *    404 Not Found
 *     {
            "error": "NotFoundError"
 *     } 
 */
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