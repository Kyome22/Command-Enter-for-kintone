(() => {
  "use strict";

  const localize = chrome.i18n.getMessage;

  const initialLocalizeHTML = () => {
    document.querySelectorAll("[data-i18n-text]").forEach((element) => {
      const key = element.getAttribute("data-i18n-text");
      element.textContent = localize(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      element.placeholder = localize(key);
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    initialLocalizeHTML();
  });
})();
