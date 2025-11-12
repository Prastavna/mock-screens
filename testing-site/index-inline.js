const statusEl = document.getElementById("status");
const screenList = document.getElementById("screens");
const requestBtn = document.getElementById("requestBtn");

const formatPermissionState = (state) => {
  switch (state) {
    case "granted":
      return "Granted ✅";
    case "denied":
      return "Denied ❌";
    case "prompt":
      return "Prompt ⚠️";
    default:
      return "Unavailable";
  }
};

async function updatePermissionStatus() {
  if (!("permissions" in navigator)) {
    statusEl.textContent = "Permissions API unsupported";
    return;
  }

  try {
    const handle = await navigator.permissions.query({
      // Chrome uses "window-management" for the manage screens capability.
      name: "window-management",
    });

    statusEl.textContent = formatPermissionState(handle.state);
    handle.onchange = () => {
      statusEl.textContent = formatPermissionState(handle.state);
    };
  } catch (error) {
    // Browsers that do not recognize the descriptor will throw.
    statusEl.textContent = "Descriptor unsupported";
    console.warn("Cannot query window-management permission", error);
  }
}

function renderScreens(list) {
  if (!list || !list.length) {
    screenList.innerHTML =
      "<p>No screen information returned. Grant permission and try again.</p>";
    return;
  }

  screenList.innerHTML = list
    .map(
      (screen, index) => `
      <article class="screen">
        <h3>Screen ${index + 1} ${screen.primary ? "(Primary)" : ""}</h3>
        <span> Label: ${screen.label}</span>
        <span>Resolution: ${screen.width} × ${screen.height}</span>
        <span>Avail size: ${screen.availWidth} × ${screen.availHeight}</span>
        <span>Color depth: ${screen.colorDepth}</span>
        <span>Left / Top: ${screen.left}, ${screen.top}</span>
      </article>
    `,
    )
    .join("");
}

async function requestScreens() {
  if (!("getScreenDetails" in window)) {
    alert("window.getScreenDetails() is not supported in this browser build.");
    return;
  }

  requestBtn.disabled = true;

  try {
    const details = await window.getScreenDetails();
    renderScreens(details.screens);

    // Keep the UI updated if displays are added/removed.
    // details.addEventListener("screenschange", () => {
    //   renderScreens(details.screens);
    // });
  } catch (error) {
    console.error("Failed to get screen details", error);
    screenList.innerHTML = `<p style="color:#dc2626;">${
      error.message || "Unable to access screens"
    }</p>`;
  } finally {
    requestBtn.disabled = false;
    updatePermissionStatus();
  }
}

requestBtn.addEventListener("click", requestScreens);
updatePermissionStatus();
