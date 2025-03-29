(() => {
  "use strict";

  const postComment = (root) => {
    const focusedForm = root.activeElement.closest("form");
    const postButton = focusedForm?.querySelector('button[type="submit"]');
    postButton?.click();
  };

  const judge = (event, root) => {
    if (event.code !== "Enter") return;
    if (event.shiftKey || event.altKey) return;

    chrome.runtime.sendMessage({ action: "post_comment" }, (response) => {
      if (!event.ctrlKey && event.metaKey && response.os === "mac") {
        postComment(root);
      } else if (event.ctrlKey && !event.metaKey && response.os === "win") {
        postComment(root);
      }
    });
  };

  const setup = () => {
    document.addEventListener("keydown", function (event) {
      judge(event, this);
    });

    const observer = new MutationObserver(() => {
      const iframe = document.querySelector("iframe");
      if (iframe === undefined || iframe === null) return;

      iframe.addEventListener("load", function () {
        this.contentWindow.document.addEventListener("keydown", function (event) {
          judge(event, this);
        });
      });
    });

    observer.observe(document.querySelector("body"), {
      attributes: false,
      childList: true,
      subtree: true,
    });
  };

  setup();
})();
