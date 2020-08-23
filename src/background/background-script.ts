import { Action, Message, ModifyHeader, Rule, rulesRepository } from '@/libs';
import { rulesStore } from './rules-store';
import { utils } from './utils';
import { isEmpty } from '@/libs/utils';

class BackgroundScript {
  init() {
    try {
      // Fetches all rules from the db and update the rule map.
      rulesStore.init();

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

      // This event is for modifying the request headers
      chrome.webRequest.onBeforeSendHeaders.addListener(
        this.handleBeforeSendHeaders,
        {
          urls: ['<all_urls>']
        },
        ['blocking', 'requestHeaders', 'extraHeaders']
      );

      // This event is for modifying the request headers
      chrome.webRequest.onHeadersReceived.addListener(
        this.handleHeadersReceived,
        {
          urls: ['<all_urls>']
        },
        ['blocking', 'requestHeaders', 'extraHeaders']
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
    const redirectUrl = rulesStore.fetchRule<string>(details.url);
    return redirectUrl ? { redirectUrl } : {};
  };

  private handleBeforeSendHeaders = (
    details: chrome.webRequest.WebRequestHeadersDetails
  ) => {
    // updated the actual headers with the stored values.
    return { requestHeaders: this.modifyHeaders(details) };
  };

  private handleHeadersReceived = (
    details: chrome.webRequest.WebRequestHeadersDetails
  ) => {
    // updated the actual headers with the stored values.
    return { responseHeaders: this.modifyHeaders(details) };
  };

  private handleMessage = (
    message: Message,
    _s: unknown,
    sendResponse: (message: string) => void
  ) => {
    const { data } = message;

    // TODO: How to make async/await here?
    this.updateStoreAndDb(message, data as Rule).then(() =>
      sendResponse('successfully updated')
    );

    // Need to return true for sendResponse to work.
    return true;
  };

  // Methods
  private modifyHeaders = (
    details: chrome.webRequest.WebRequestHeadersDetails
  ) => {
    const { requestHeaders, url } = details;
    const val = rulesStore.fetchRule<ModifyHeader>(url);

    if (isEmpty(val)) {
      return;
    }

    const headersToUpdate = val?.headers;
    const actualHeaders = requestHeaders ?? [];

    const idx = (key: string) =>
      actualHeaders.findIndex(
        header => header.name?.toLowerCase() === key.toLowerCase()
      );

    if (val?.action === 'add') {
      for (const key in headersToUpdate) {
        actualHeaders.push({ name: key, value: headersToUpdate[key] });
      }
    }

    if (val?.action === 'update') {
      for (const key in headersToUpdate) {
        const i = idx(key);
        if (i !== -1) {
          actualHeaders[i].value = headersToUpdate[key];
        }
      }
    }

    if (val?.action === 'remove') {
      for (const key in headersToUpdate) {
        const i = idx(key);
        if (i !== -1) {
          actualHeaders.splice(i, 1);
        }
      }
    }

    return actualHeaders;
  };

  private updateStoreAndDb = async (request: Message, rule: Rule) => {
    if (request.action === Action.SAVE_RULE) {
      rulesStore.updateRule(rule);
      await rulesRepository.upsert(rule);
    }

    if (request.action === Action.DELETE_RULE) {
      const toDelete = { ...rule };
      toDelete.isActive = false;
      rulesStore.updateRule(toDelete);
      await rulesRepository.deleteById(rule.id);
    }
  };
}

export const backgroundScript = new BackgroundScript();
