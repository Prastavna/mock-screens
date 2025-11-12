const mockScreens = ({
  numOfScreens = 1,
  firstScreenName = "Built-in display",
}: {
  numOfScreens?: number;
  firstScreenName?: string;
}) => {
  // Inject the override script
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("src/content-script/override.js");
  script.onload = function () {
    // After script loads, send config via custom event
    const event = new CustomEvent("__MOCK_SCREENS_CONFIG__", {
      detail: { numOfScreens, firstScreenName },
    });
    window.dispatchEvent(event);

    // Clean up
    (this as HTMLScriptElement).remove();
  };
  (document.head || document.documentElement).appendChild(script);
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "mock-screens") {
    mockScreens({
      numOfScreens: message.payload.numOfScreens,
      firstScreenName: message.payload.firstScreenName,
    });
  }
});
