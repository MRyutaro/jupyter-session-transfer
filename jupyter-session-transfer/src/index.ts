import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the jupyter-session-transfer extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-session-transfer:plugin',
  description: 'A JupyterLab session tranfer extension.',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry | null
  ) => {
    // jupyter lab起動時にactivateが呼ばれる
    console.log('JupyterLab extension jupyter-session-transfer is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log(
            'jupyter-session-transfer settings loaded:',
            settings.composite
          );
        })
        .catch(reason => {
          console.error(
            'Failed to load settings for jupyter-session-transfer.',
            reason
          );
        });
    }

    // localhost/jupyter-session-transfer/get-exampleにGETリクエストが送られる
    requestAPI<any>('get-example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The jupyter_session_transfer server extension appears to be missing.\n${reason}`
        );
      });

      // appにbuttonを追加したりする
  }
};

export default plugin;
