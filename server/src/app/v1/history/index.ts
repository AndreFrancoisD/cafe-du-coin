import { NextFunction, Request, Response } from 'express';
import { poolManager } from '../../../postgresManager';
import { AuthenticationRequest } from '../authentication/authenticationManager';

type GameHistory = {
    id: number,
    idUser: number,
    idGame: number,
    borrowDate: Date,
    returnDate: Date
};

type Test = Request & { gameHistory: GameHistory };

export class GameHistoryManager {

    public getGameHistorytMiddleware() {

        const getGameHistory = (req: Request, res: Response, next: NextFunction) => {
            try {
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
                        throw error;
                    });
            } catch (error: unknown) {
                next(error);
            }
        }

        return getGameHistory
    }
}