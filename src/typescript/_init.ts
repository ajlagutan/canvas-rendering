import "../scss/styles.scss";

import { SceneManager } from "./core";

(function () {
  const manager = new SceneManager();
  manager.initialize();
  manager.start();
})();
