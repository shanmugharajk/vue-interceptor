class Background {
  init() {
    browser.browserAction.onClicked.addListener(this.handleBrowserAction);
  }

  // handlers
  private handleBrowserAction = () => {
    const optionsUrl = chrome.extension.getURL("options.html");

    chrome.tabs.query({}, (extensionTabs: chrome.tabs.Tab[]) => {
      let found = false;

      for (let i = 0, len = extensionTabs.length; i < len; i += 1) {
        if (optionsUrl === extensionTabs[i].url) {
          found = true;
          chrome.tabs.update(extensionTabs[i].id ?? Math.random(), {
            selected: true,
          });
          break;
        }
      }
      if (found === false) {
        chrome.tabs.create({ url: optionsUrl });
      }
    });
  };
}

export default new Background();
