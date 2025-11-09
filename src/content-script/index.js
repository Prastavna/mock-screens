(() => {
  if (window.__forceScreensOverrideApplied) {
    return;
  }

  window.__forceScreensOverrideApplied = true;

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
    devicePixelRatio: 1,
  };

  const fakeScreenDetails = {
    currentScreen: fakeScreen,
    screens: [fakeScreen],
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  };

  const overrideFn = async () => fakeScreenDetails;
  Object.defineProperty(overrideFn, 'name', {
    value: 'forceScreensGetScreenDetails',
  });

  Object.defineProperty(window, 'getScreenDetails', {
    value: overrideFn,
    writable: false,
    configurable: true,
  });

  console.info('Force Screens: window.getScreenDetails has been overridden automatically.');
})();
