export {}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCurrentTabUrl") {
    // Get the URL of the currently active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0 && tabs[0].url) {
        // Send the URL back to the popup script
        sendResponse({ url: tabs[0].url })
      } else {
        // Handle error if unable to retrieve URL
        sendResponse(null)
      }
    })
    // Indicate that sendResponse will be called asynchronously
    return true
  }
})
