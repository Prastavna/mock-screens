// This runs in the page context, not isolated
(function() {
  // Listen for configuration from the content script
  window.addEventListener('__MOCK_SCREENS_CONFIG__', (event) => {
    const numOfScreens = parseInt(event.detail.numOfScreens || "1");
    const firstScreenName = event.detail.firstScreenName || "Built-in display";
    
    if (window.getScreenDetails) {
      window._isScreenMocked = true;

      window.getScreenDetails = async function() {
        const fakeScreens = {
          screens: Array(numOfScreens).fill(null).map((_, i) => ({
            availHeight: 1080,
            availWidth: 1920,
            width: 1920,
            height: 1080,
            colorDepth: 24,
            pixelDepth: 24,
            left: i * 1920,
            top: 0,
            isInternal: i === 0,
            isPrimary: i === 0,
            label: i == 0 ? firstScreenName : `Screen ${i + 1}`
          })),
          currentScreen: {
            availHeight: 1080,
            availWidth: 1920,
            width: 1920,
            height: 1080,
            colorDepth: 24,
            pixelDepth: 24,
            left: 0,
            top: 0,
            isInternal: true,
            isPrimary: true,
            label: firstScreenName
          }
        };
        return fakeScreens;
      };
    }
  });
})();
