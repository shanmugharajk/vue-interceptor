import { Action, Message, RuleType, Rule, rulesRepository } from '@/libs';
import { ruleStore } from './rules-store';
import { utils } from './utils';

class BackgroundScript {
  init() {
    try {
      // Fetches all rules from the db and update the rule map.
      ruleStore.init();

      // Extensopn Icon click handler - Opens the options page in a new tab.
      browser.browserAction.onClicked.addListener(this.handleBrowserAction);

      // Listening message from options page.
      chrome.runtime.onMessage.addListener(this.handleMessage);

      // This event is for redirecting the urls.
      chrome.webRequest.onBeforeRequest.addListener(
        this.handleBeforeRequestCb,
        {
          urls: ['<all_urls>']
        },
        ['blocking']
      );
    } catch (error) {
      console.error(error);
    }
  }

  // Handlers
  private handleBrowserAction = () => {
    const optionsUrl = chrome.extension.getURL('options.html');
    utils.openOptionsPage(optionsUrl);
  };

  private handleBeforeRequestCb = (
    details: chrome.webRequest.WebRequestBodyDetails
  ) => {
    const redirectUrl = ruleStore.fetchRedirectUrl(details.url);
    return redirectUrl ? { redirectUrl } : {};
  };

  private handleMessage = (
    message: Message,
    _s: unknown,
    sendResponse: (message: string) => void
  ) => {
    const { data } = message;

    switch (data.ruleType) {
      case RuleType.REDIRECT:
        this.handleRedirectRequest(message, data as Rule).then(() =>
          sendResponse('successfully updated')
        );
        break;

      default:
        break;
    }

    // Need to return true for sendResponse to work.
    return true;
  };

  // Methods
  private handleRedirectRequest = async (request: Message, rule: Rule) => {
    if (request.action === Action.SAVE_RULE) {
      ruleStore.updateRedirectRuleMap(rule);
      rulesRepository.upsert(rule);
    }

    if (request.action === Action.DELETE_RULE) {
      const toDelete = { ...rule };
      toDelete.isActive = false;
      ruleStore.updateRedirectRuleMap(toDelete);
      rulesRepository.deleteById(rule.id);
    }
  };
}

export const backgroundScript = new BackgroundScript();
