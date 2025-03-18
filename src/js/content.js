(() => {
  "use strict";

  const postComment = () => {
    const focusedForm = document.activeElement.closest("form");
    const postButton = focusedForm?.querySelector('button[type="submit"]');
    postButton?.click();
  };

  document.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      let modifierKey = null;
      if (!event.shiftKey && !event.altKey && !event.ctrlKey && event.metaKey) {
        modifierKey = "command";
      } else if (!event.shiftKey && !event.altKey && event.ctrlKey && !event.metaKey) {
        modifierKey = "control";
      } else {
        return;
      }
      chrome.runtime.sendMessage({ action: "post-comment" }, (response) => {
        if (modifierKey === "command" && response.os === "mac") {
          postComment();
        } else if (modifierKey === "control" && response.os === "win") {
          postComment();
        }
      });
    }
  });
})();
