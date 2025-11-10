const overrideButton = document.getElementById('overrideScreens');
const REQUEST_TYPE = 'REQUEST_FORCE_SCREENS_OVERRIDE';
const DEFAULT_LABEL = 'Override getScreenDetails';

const getActiveTab = () =>
  new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }

      resolve(tabs?.[0]);
    });
  });

const sendOverrideRequest = (tabId) =>
  new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, { type: REQUEST_TYPE }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }

      resolve(response);
    });
  });

overrideButton?.addEventListener('click', async () => {
  if (!overrideButton) {
    return;
  }

  overrideButton.disabled = true;
  overrideButton.textContent = 'Requesting override...';

  try {
    const tab = await getActiveTab();
    if (!tab?.id) {
      throw new Error('No active tab found');
    }

    await sendOverrideRequest(tab.id);
    overrideButton.textContent = 'Override requested ✅';
  } catch (error) {
    console.error('Force Screens: failed to request override', error);
    overrideButton.textContent = 'Request failed, retry?';
  } finally {
    setTimeout(() => {
      overrideButton.disabled = false;
      overrideButton.textContent = DEFAULT_LABEL;
    }, 1500);
  }
});
