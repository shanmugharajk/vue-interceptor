class Utils {
  openOptionsPage(optionsUrl: string) {
    chrome.tabs.query({}, function(extensionTabs: chrome.tabs.Tab[]) {
      let found = false;

      for (let i = 0, len = extensionTabs.length; i < len; i++) {
        if (optionsUrl === extensionTabs[i].url) {
          found = true;
          chrome.tabs.update(extensionTabs[i].id ?? Math.random(), {
            selected: true
          });
          break;
        }
      }
      if (found === false) {
        chrome.tabs.create({ url: optionsUrl });
      }
    });
  }
}

export const utils = new Utils();
