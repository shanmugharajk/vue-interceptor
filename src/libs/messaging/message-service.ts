import { Rule } from '../storage';

import { Action, Message } from './types';

/**
 * Sends the message to the background script in the extension. This is helpful
 * to send the data from options UI to the background script (extension)
 */
class MessagingService {
  private sendMessage(message: Message) {
    return new Promise(resolve => {
      // This fallback is required for running react project as web app for testing.
      chrome.extension
        ? chrome.runtime.sendMessage(message, resolve)
        : resolve();
    });
  }

  saveRule(data: Rule) {
    return this.sendMessage({ action: Action.SAVE_RULE, data });
  }

  deleteRule(data: Rule) {
    return this.sendMessage({ action: Action.DELETE_RULE, data });
  }

  toggleStatus(data: Rule) {
    return this.sendMessage({ action: Action.TOGGLE_STATUS, data });
  }
}

export const messagingService = new MessagingService();
