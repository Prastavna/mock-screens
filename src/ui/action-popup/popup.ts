document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("screenForm");

  if (form) {
    // Populate form fields with saved values
    const savedScreenName = localStorage.getItem("screenName") || "Built-in display";
    const savedScreenCount = localStorage.getItem("screenCount") || "1";

    const screenNameInput = document.getElementById("screenName") as HTMLInputElement;
    const screenCountInput = document.getElementById("screenCount") as HTMLInputElement;

    if (screenNameInput) screenNameInput.value = savedScreenName;
    if (screenCountInput) screenCountInput.value = savedScreenCount;

    // Handle form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (screenCountInput && screenNameInput) {
        const screenCount = screenCountInput.value;
        const screenName = screenNameInput.value;

        // Save values to localStorage
        localStorage.setItem("screenName", screenName);
        localStorage.setItem("screenCount", screenCount);

        console.log(`Screen name: ${screenName}, Number of screens: ${screenCount}`);
      } else {
        console.error("Form inputs not found.");
      }
    });
  } else {
    console.error("Form not found.");
  }
});