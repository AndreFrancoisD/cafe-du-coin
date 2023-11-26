import { NextFunction, Request, Response } from 'express';
import { poolManager } from '../../../postgresManager';

export class Games {
    //https://www.ludum.fr/blog/les-100-meilleurs-jeux-pour-jouer-en-ludotheque-n416#famille
    //document.querySelectorAll("span.blog_jeulist_info_title").forEach(retour = function(e){console.log(e.innerText);})
    //document.querySelectorAll("div.blog_jeulist_detail").forEach(retour = function(e){console.log(e.querySelector("p").innerText);})
    public getGameListMiddleware() {

        const getGameList = (req: Request, res: Response, next: NextFunction) => {
            try {
                poolManager.query('SELECT title, DATE(return_date), returned FROM cafeducoin.games ORDER BY title ASC')
                    .then((result: any) => {                       
                        res.send(result);
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
                poolManager.query('SELECT title, DATE(return_date), returned FROM cafeducoin.games WHERE id=$1', [gameId])
                .then((result: any) => {                    
                    res.send(result);
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
                res.send(`Update du jeu ${gameId}`);
            } catch (error: unknown) {
                next(error);
            }

        }

        return updateGame
    }
}

