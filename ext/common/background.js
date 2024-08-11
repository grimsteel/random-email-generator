chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    // open the options page to make them set the domain/recipient id
    chrome.runtime.openOptionsPage();
  }
});
