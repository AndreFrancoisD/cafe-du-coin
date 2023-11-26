import { app, config,  version } from './app/index';
import ProcessManager from './processManager';

/**
 * PROCESS EVENTSHANDLER
 * Binds events on current process.
 */
ProcessManager.eventInitialization();

app.listen(config.server.port, () => {

  // logger.info('Environment ' + process.env.NODE_ENV)
  //   .catch(e => console.log(e));

  // logger.info(`API CAFE DU COIN ${version} is running on port ${config.server.port}.`)
  //   .catch(e => console.log(e));

  console.log(`API CAFE DU COIN ${version} is running on port ${config.server.port}.`);
});