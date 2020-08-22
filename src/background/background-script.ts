import { ruleStore } from './rules-store';
import { utils } from './utils';

class BackgroundScript {
  init() {
    try {
      ruleStore.init();
      browser.browserAction.onClicked.addListener(this.handleBrowserAction);
    } catch (error) {
      console.error(error);
    }
  }

  // Handlers
  handleBrowserAction() {
    const optionsUrl = chrome.extension.getURL('options.html');
    utils.openOptionsPage(optionsUrl);
  }
}

export const backgroundScript = new BackgroundScript();
