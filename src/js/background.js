(() => {
  "use strict";

  const handlePostCommentRequest = (callback) => {
    chrome.runtime.getPlatformInfo((info) => {
      if (chrome.runtime.lastError) {
        console.error("Failed to get platform info:", chrome.runtime.lastError);
        callback({ os: "unknown" });
        return;
      }
      callback(info);
    });
  };

  const messageHandler = (request, _, callback) => {
    if (request.action === "post_comment") {
      handlePostCommentRequest(callback);
    }
    return true;
  };

  chrome.runtime.onMessage.addListener(messageHandler);
})();
