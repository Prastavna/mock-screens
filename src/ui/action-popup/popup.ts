document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("screenForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const screenCountInput = document.getElementById("screenCount");

      if (screenCountInput) {
        const screenCount = (screenCountInput as HTMLInputElement).value;
        console.log(`Selected number of screens: ${screenCount}`);
      } else {
        console.error("Screen count input not found.");
      }
    });
  } else {
    console.error("Form not found.");
  }
});