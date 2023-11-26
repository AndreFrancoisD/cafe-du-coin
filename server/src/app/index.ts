import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
//import gislogger from 'gis.logger';
import packagefile from '../../package.json';
import configfile from './../../config/config.json';
import {router as routerV1} from './v1'


/**
 * SERVER & APPLICATION
 */
export const app = express();

// For https protocol
app.enable('trust proxy');

/**
 * Configuration file for GRAYLOG, SERVER, etc.
 */
export const config = configfile;
export const version = packagefile.version;

/**
 * New singleton logger.
 */
//export const logger = new gislogger(config.logs);

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

    //logger.error(error.stack ? error.stack : JSON.stringify(error));

    res.status((error as any).status ?? 500).json({ error: `JSONError`, detail: error.message ?? JSON.stringify(error) });
});

app.use(express.urlencoded({ limit: '50mb' }));

//-----------------------------GAMES API
app.use(routerV1);

//Error 404
app.use('*', function (req, res) {
    res.status(404).json({ error: 'NotFoundError' });
});