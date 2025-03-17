(() => {
  chrome.runtime.onMessage.addListener((request, _, callback) => {
    if (request.action === "post-comment") {
      chrome.runtime.getPlatformInfo((info) => {
        callback(info);
      });
    }
    return true;
  });
})();
