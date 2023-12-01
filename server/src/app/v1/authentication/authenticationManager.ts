import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { createHash } from 'crypto';
import { logger } from '../../logManager';
import { poolManager } from '../../postgresManager'

type User = {
    id: number,
    name: string,
    email: string,
    pwd: string,
    username: string
}

export type AuthenticationRequest = Request & { currentUser: User }

/**
 * @description
 * Manages the authentication to the API
 * A JWT authentication is used
 * - get the token
 * - authentify the token when requesting API
 * 
 * Cette classe devrait être enrichie par la gestion d'un refreshtoken.
 * Par manque de temps il n'est pas utilisé.
 */
export class Authentication {

    /**
     * Returns an express middleware used to fetch a token.
     * @returns An Express middleware 
     */
    public getTokenMiddleware() {

        const getToken = (req: Request, res: Response, next: NextFunction) => {
            try {
                //Pour l'exemple l'utilisateur suivant est créé dans la base
                //username = 'john smith' (tout en minuscule)
                //password = 'mypassword'

                // Il faut rajouter des asserts sur les entrées pour éviter les erreurs opérationnelles
                const username = req.body.username;
                const password = createHash('sha256').update(req.body.password).digest('hex');

                poolManager.query('SELECT id, firstname, lastname, email, pwd FROM cafeducoin.users WHERE username=$1', [username])
                    .then((result) => {
                        if (result == null)
                            throw new Error('The result of the request is null.');

                        if (result.rows.length == 0) {
                            res.status(401).send('invalid credentials');
                            return;
                        }

                        const user: User = result.rows[0];

                        if (password !== user.pwd) {
                            res.status(401).send('invalid credentials');
                            return;
                        }

                        const accessToken = this._generateAccessToken(user);

                        res.send({
                            accessToken
                        });
                    })
                    .catch((error: Error) => {
                        res.send(error);
                    });

            } catch (error: unknown) {
                next(error);
            }
        }

        return getToken;

    }

    /**
     * Returns an express middleware used verify the token.
     * @returns An Express middleware 
     */
    public authenticateTokenMiddleware() {

        const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

            try {
                const authHeader = req.headers['authorization']
                const token = authHeader && authHeader.split(' ')[1]

                if (token == null) return res.sendStatus(401)

                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, userToken) => {
                    if (err) {
                        return res.sendStatus(401)
                    }
                    const { id, name, email, pwd, username } = userToken as JwtPayload;

                    (req as AuthenticationRequest).currentUser = { id, name, email, pwd, username };

                    next();
                });
            }
            catch (error) {
                logger.error(error);
                next(error);
            }

        }

        return authenticateToken;
    }

    //TODO: put expiry duration in a configuration file
    private _generateAccessToken = (user: User) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1800s' });
    }
}