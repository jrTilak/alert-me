export default class PopUtils {
  public static getCurrentTabUrl(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action: "getCurrentTabUrl" }, (response) => {
        if (response && response.url) {
          const currentUrl = response.url
          const hostname = new URL(currentUrl).hostname
          resolve(hostname)
        } else {
          console.error("Unable to retrieve URL")
          reject(null)
        }
      })
    })
  }
}
