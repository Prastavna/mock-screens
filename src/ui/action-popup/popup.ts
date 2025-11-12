document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("screenForm");

  if (form) {
    const savedScreenName = localStorage.getItem("screenName") || "Built-in display";
    const savedScreenCount = localStorage.getItem("screenCount") || "1";

    const screenNameInput = document.getElementById("screenName") as HTMLInputElement;
    const screenCountInput = document.getElementById("screenCount") as HTMLInputElement;

    if (screenNameInput) screenNameInput.value = savedScreenName;
    if (screenCountInput) screenCountInput.value = savedScreenCount;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (screenCountInput && screenNameInput) {
        const screenCount = screenCountInput.value;
        const screenName = screenNameInput.value;

        localStorage.setItem("screenName", screenName);
        localStorage.setItem("screenCount", screenCount);

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const tabId = tabs[0].id;
          if(tabId) {
            chrome.tabs.sendMessage(tabId, {
              action: "mock-screens",
              payload: {
                numOfScreens: screenCount,
                firstScreenName: screenName
              }
            });
          }
        });
      } else {
        console.error("Form inputs not found.");
      }
    });
  } else {
    console.error("Form not found.");
  }
});
