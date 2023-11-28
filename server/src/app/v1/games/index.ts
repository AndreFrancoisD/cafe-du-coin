import { NextFunction, Request, Response } from 'express';
import { poolManager } from '../../../postgresManager';

type Game = {
    id: number,
    title: string,
    returnDate: Date,
    boolean: string
}

export class GameManager {
    
    public getGameListMiddleware() {

        const getGameList = (req: Request, res: Response, next: NextFunction) => {          
                poolManager.query('SELECT id, title, returned FROM cafeducoin.games ORDER BY title ASC')
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

    public updateGameMiddleware() {

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

