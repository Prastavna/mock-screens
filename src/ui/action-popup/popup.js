const overrideButton = document.getElementById('overrideScreens');

overrideButton?.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.id) {
      console.error('Force Screens: Unable to find the active tab.');
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: 'MAIN',
      func: () => {
        const isWindows = navigator.userAgent.toLowerCase().includes('windows');

        if (!isWindows) {
          console.warn('Force Screens: getScreenDetails override is only applied on Windows.');
          return;
        }

        const fakeScreen = {
          availHeight: 1080,
          availWidth: 1920,
          colorDepth: 24,
          height: 1080,
          width: 1920,
          pixelDepth: 24,
          isExtended: false,
          isPrimary: true,
          label: 'Fake Screen 1',
          devicePixelRatio: 1
        };

        const fakeScreenDetails = {
          currentScreen: fakeScreen,
          screens: [fakeScreen],
          onchange: null,
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false
        };

        const overrideFn = async () => fakeScreenDetails;
        Object.defineProperty(overrideFn, 'name', { value: 'forceScreensGetScreenDetails' });

        Object.defineProperty(window, 'getScreenDetails', {
          value: overrideFn,
          writable: false,
          configurable: true
        });

        console.info('Force Screens: window.getScreenDetails has been overridden.');
      }
    });
  } catch (error) {
    console.error('Force Screens: Failed to override getScreenDetails.', error);
  }
});
