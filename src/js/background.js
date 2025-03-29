(() => {
  chrome.runtime.onMessage.addListener((request, _, callback) => {
    if (request.action === "post_comment") {
      chrome.runtime.getPlatformInfo((info) => {
        callback(info);
      });
    }
    return true;
  });
})();
