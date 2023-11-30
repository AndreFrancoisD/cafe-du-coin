import { app } from './app/index';
import { logger } from './app/logManager';
import ProcessManager from './app/processManager';
import configFile from '../config/config.json'
import packageFile from '../package.json'
/**
 * PROCESS EVENTSHANDLER
 * Binds events on current process.
 */
ProcessManager.eventInitialization();

const config = configFile;
const version = packageFile.version;

app.listen(config.server.port, '0.0.0.0', () => {

  logger.info('Environment ' + process.env.NODE_ENV)
    .catch(e => console.log(e));

  logger.info(`API CAFE DU COIN ${version} is running on port ${config.server.port}.`)
    .catch(e => console.log(e));

});