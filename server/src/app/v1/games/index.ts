import { NextFunction, Request, Response } from 'express';
import { poolManager } from '../../postgresManager' 


/**
 * @description
 * Manages Express middleware for games:
 * - get the game list
 * - get some game info
 * - update the availability status of a game
 */
export class GameManager {
    
    /**
     * Used to get game list
     * @returns An Express middleware
     */
    public getGameListMiddleware() {

        const getGameList = (req: Request, res: Response, next: NextFunction) => {          
                poolManager.query('SELECT id, title, returned FROM cafeducoin.games ORDER BY title ASC LIMIT 20')
                    .then((result) => {
                        if (result == null)
                            throw new Error('The result of the request is null.');
                        res.send(result?.rows);
                    })
                    .catch((error: Error) => {
                        next(error);
                    });          
        }

        return getGameList
    }

     /**
     * Used to get game info
     * @returns An Express middleware
     */
    public getGameDetailMiddleware() {

        const getGame = (req: Request, res: Response, next: NextFunction) => {           
                const gameId = req.params.gameId;
                poolManager.query('SELECT id, title, returned FROM cafeducoin.games WHERE id=$1', [gameId])
                    .then((result) => {
                        if (result == null)
                            throw new Error('The result of the request is null.');
                        res.send(result?.rows);
                    })
                    .catch((error: Error) => {
                        next(error);
                    });
        }

        return getGame
    }

     /**
     * Used to update game availability
     * @returns An Express middleware
     */
    public updateGameMiddleware() {

        /**
         * Cette méthode n'est pas complètement terminée: si la deuxième requête 
         * renvoie une erreur, il faut s'assurer de remettre le flag 'returned' modifié
         * dans la première requête à son état d'origine.
         * @param req Express request
         * @param res Express response
         * @param next Express next function
         */
        const updateGame = (req: Request, res: Response, next: NextFunction) => {          
                const gameId = req.params.gameId;
                const returned = req.body.returned;
                const userId = req.body.userId;

                poolManager.query(`UPDATE cafeducoin.games
                                   SET returned = $1
                                   WHERE id=$2`, [returned, gameId])
                    .then((result1) => {
                        if (result1 == null)
                            throw new Error('The result of the request is null.');  
                        return result1;                     
                    })
                    .then((result2) => {
                       
                        const query = JSON.parse(returned.toLowerCase())
                        ? `UPDATE cafeducoin.history 
                            SET return_date=$3 
                            WHERE id_game=$1
                            AND id_user=$2
                            AND return_date IS NULL`
                        : `INSERT INTO cafeducoin.history VALUES (DEFAULT, $1, $2, $3, null)`;

                        return poolManager.query(query, [gameId, userId, new Date().toLocaleDateString('en-US')]);                       
                        
                    })
                    .then((result3) => {
                        if (result3 == null)
                            throw new Error('The result of the request is null.');        
                        res.sendStatus(200);
                    })
                    .catch((error: Error) => {
                        next(error);
                    }); 
        }

        return updateGame
    }
}

