const mockScreens = ({
  numOfScreens = 1,
  firstScreenName = "Built-in display"
}: {
  numOfScreens?: number,
  firstScreenName?: string
}) => {
  if (window.getScreenDetails) {
    window._isScreenMocked = true;
    window.getScreenDetails = async () => {
      console.log("hellllll2")
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
          label: `Screen ${i + 1}`
        })),
      };

      return fakeScreens;
    };
  }

  // Override screen object properties if needed
  Object.defineProperty(window, 'getScreenDetails', {
    value: new Proxy(window.getScreenDetails, {
      get(target, prop) {
        return target[prop];
      }
    })
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "mock-screens") {
    mockScreens({
      numOfScreens: message.payload.numOfScreens,
      firstScreenName: message.payload.firstScreenName
    })
    sendResponse({ result: "done" });
  }
});
