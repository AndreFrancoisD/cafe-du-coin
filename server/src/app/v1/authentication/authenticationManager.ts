import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { poolManager } from '../../../postgresManager';
import { createHash } from 'crypto';

type User = {
    id: number,
    name: string,
    email: string,
    pwd: string,
    username: string
}

interface AuthenticationRequest extends Request { user: User }

export class Authentication {



    public getTokenMiddleware() {

        const getToken = (req: Request, res: Response, next: NextFunction) => {
            try {
                //password = 'mypassword'
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
                        //password = 'mypassword'

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
                        throw error;
                    });




            } catch (error: unknown) {
                next(error);
            }
        }

        return getToken;

    }

    public authenticateTokenMiddleware() {

        const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
            
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            if (token == null) return res.sendStatus(401)

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
                if (err) {
                    return res.sendStatus(401)
                }
                const authReq = req as AuthenticationRequest;
                
                next();
            });
        }

        return authenticateToken;
    }

    private _generateAccessToken = (user: User) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1800s' });
    }
}