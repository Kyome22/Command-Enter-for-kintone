(() => {
  "use strict";

  const isSameOrigin = (iframe) => {
    try {
      const currentOrigin = window.location.origin;
      const iframeOrigin = new URL(iframe.src).origin;
      return currentOrigin === iframeOrigin;
    } catch {
      return false;
    }
  };

  const createKeydownHandler = (root) => (event) => {
    if (event.code !== "Enter") return;
    if (event.shiftKey || event.altKey) return;

    chrome.runtime.sendMessage({ action: "post_comment" }, (response) => {
      const isMacCommand = !event.ctrlKey && event.metaKey && response.os === "mac";
      const isWindowsControl = event.ctrlKey && !event.metaKey && response.os === "win";

      if (isMacCommand || isWindowsControl) {
        const focusedForm = root.activeElement.closest("form");
        const postButton = focusedForm?.querySelector('button[type="submit"]');
        postButton?.click();
      }
    });
  };

  const setupIframeListener = (iframe) => {
    iframe.addEventListener("load", function () {
      try {
        const iframeDocument = this.contentWindow.document;
        iframeDocument.addEventListener("keydown", createKeydownHandler(iframeDocument));
      } catch (error) {
        console.warn("Failed to access iframe content:", error);
      }
    });
  };

  const setupMutationObserver = () => {
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector("iframe");
      if (iframe && isSameOrigin(iframe)) {
        setupIframeListener(iframe);
      }
    });

    observer.observe(document.querySelector("body"), {
      attributes: false,
      childList: true,
      subtree: true,
    });
  };

  const setup = () => {
    document.addEventListener("keydown", createKeydownHandler(document));
    setupMutationObserver();
  };

  setup();
})();
