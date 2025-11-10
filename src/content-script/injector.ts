(function() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('src/content-script/override.ts');
  script.onload = function() {
    (this as HTMLScriptElement).remove();
  };
  (document.head || document.documentElement).appendChild(script);
})();
