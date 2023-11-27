import { NextFunction, Request, Response } from 'express';
import { poolManager } from '../../../postgresManager';

type Game = {
    id: number,
    title: string,
    returnDate: Date,
    boolean: string
}

export class GameManager {
    //https://www.ludum.fr/blog/les-100-meilleurs-jeux-pour-jouer-en-ludotheque-n416#famille
    //document.querySelectorAll("span.blog_jeulist_info_title").forEach(retour = function(e){console.log(e.innerText);})
    //document.querySelectorAll("div.blog_jeulist_detail").forEach(retour = function(e){console.log(e.querySelector("p").innerText);})
    public getGameListMiddleware() {

        const getGameList = (req: Request, res: Response, next: NextFunction) => {
            try {
                poolManager.query('SELECT id, title, returned FROM cafeducoin.games ORDER BY title ASC')
                    .then((result) => {
                        if (result == null)
                            throw new Error('The result of the request is null.');
                        res.send(result?.rows);
                    })
                    .catch((error: Error) => {
                        throw error;
                    });
            } catch (error: unknown) {
                next(error);
            }
        }

        return getGameList
    }

    public getGameDetailMiddleware() {

        const getGame = (req: Request, res: Response, next: NextFunction) => {
            try {
                const gameId = req.params.gameId;
                poolManager.query('SELECT id, title, returned FROM cafeducoin.games WHERE id=$1', [gameId])
                    .then((result) => {
                        if (result == null)
                            throw new Error('The result of the request is null.');
                        res.send(result?.rows);
                    })
                    .catch((error: Error) => {
                        throw error;
                    });
            } catch (error: unknown) {
                next(error);
            }

        }

        return getGame
    }

    public updateGameMiddleware() {

        const updateGame = (req: Request, res: Response, next: NextFunction) => {
            try {
                const gameId = req.params.gameId;
                poolManager.query(`UPDATE cafeducoin.games
                                   SET returned= NOT returned
                                   WHERE id=$1`, [gameId])
                    .then((result) => {
                        if (result == null)
                            throw new Error('The result of the request is null.');
                        res.send(result?.rows);
                    })
                    .catch((error: Error) => {
                        throw error;
                    });
            } catch (error: unknown) {
                next(error);
            }

        }

        return updateGame
    }
}

