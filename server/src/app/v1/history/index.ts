import { NextFunction, Request, Response } from 'express';
import { AuthenticationRequest } from '../authentication/authenticationManager';
import { poolManager } from '../../postgresManager'


/**
 * @description Manager class for game history requests.
 */
export class GameHistoryManager {

    /**
     * Returns an express middleware used to fetch the history of a defined game.
     * @returns An Express middleware 
     */
    public getGameHistorytMiddleware() {

        const getGameHistory = (req: Request, res: Response, next: NextFunction) => {

            const gameId = req.params.gameId;
            const userId = (req as AuthenticationRequest).currentUser.id;
            poolManager.query(`SELECT hi.id, hi.borrow_date, hi.return_date, ga.title 
                                    FROM cafeducoin.history hi
                                    INNER JOIN cafeducoin.games ga ON hi.id_game=ga.id
                                    INNER JOIN cafeducoin.users us ON hi.id_user=us.id
                                    WHERE ga.id=$1
                                    AND us.id=$2
                                    ORDER BY hi.id ASC`, [gameId, userId])
                .then((result) => {
                    if (result == null)
                        throw new Error('The result of the request is null.');
                    res.send(result?.rows);
                })
                .catch((error: Error) => {
                    next(error);
                });
        }

        return getGameHistory
    }
}