import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import {logger} from './logManager';
import {router as routerV1} from './v1'
import ProcessManager from './processManager';

/**
 * PROCESS ENVIRONMENT VARIABLES
 * Set environment variables
 */
ProcessManager.setEnvironmentVariables();

/**
 * SERVER & APPLICATION
 */
export const app = express();

// For https protocol
app.enable('trust proxy');

/**
 * ADD CORS MANAGEMENT (CROSS-DOMAIN)
 */
app.use(cors());

/** 
* HANDLES REQUESTS JSON REQUESTS AND UNCODED BODIES 
 */
app.use(express.json({ limit: '50mb' }));
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

    if (res.headersSent) {
        return next(error);
    }

    logger.error(error);

    res.status((error as any).status ?? 500).json({error });
});

app.use(express.urlencoded({ limit: '50mb' }));

//-----------------------------GAMES API
// Add the V1
app.use(routerV1);

//Error 404
app.use('*', function (req, res) {
    res.status(404).json({ error: 'NotFoundError' });
});